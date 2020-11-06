import { takeEvery, put, call, all } from 'redux-saga/effects';
import { openDB } from 'idb';

import {
  CONFIG_LOAD,
  LOADING_ERROR,
  SET_DATA,
  PRELOAD_DATA,
  CACHE_DATA
} from 'constants/actions';

import API from 'utils/api';
import fileReader from 'utils/fileReader';
//import loadingData from 'mocks/data.json';

const DATABASE_NAME = "SweetyLink";
const DATABASE_VERSION = 1;
const PROFILE_STORE = "profile";
const CONTENT_STORE = "content";

function dbPromise() {
  return openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (oldVersion < newVersion) {
        try {
          db.createObjectStore(PROFILE_STORE);
        } catch {
        }

        try {
          db.createObjectStore(CONTENT_STORE);
        } catch {
        }
      }
    }
  });
}

function dbPut(db, storeName, value, query) {
  try {
    return db.put(storeName, value, query);
  } catch (error) {
    console.warn(error);
    return Promise.resolve(null);
  }
}

function dbGet(db, storeName, query) {
  try {
    return db.get(storeName, query);
  } catch (error) {
    console.warn(error);
    return Promise.resolve(null);
  }
}

function dbGetAllKeys(db, storeName) {
  try {
    return db.getAllKeys(storeName);
  } catch (error) {
    console.warn(error);
    return Promise.resolve([]);
  }
}

function contentKey(profile, key) {
  return `${profile}:${key}`;
}

function* loadConfig({ profile }) {
  try {
    let loadingData = null;
    let db = yield call(dbPromise, {});
    let loading = 0;
    while (!loadingData && loading < 10) {
      loadingData = yield call(API.getData, {});
      if (loadingData != null) {
        yield call(dbPut, db, PROFILE_STORE, loadingData, profile);
      } else {
        loadingData = yield call(dbGet, db, PROFILE_STORE, profile);
      }
      loading++;
    }
    if (!loadingData) {
      yield put({ type: LOADING_ERROR, error: "No data" });
    } else 
    {
      const {
        themes,
        buttonColors,
        backgrounds,
        config,
        account,
        ...data
      } = loadingData;

      let keys = yield call(dbGetAllKeys, db, CONTENT_STORE);

      const tracks = data.catalogItems.filter(c => c.audio && c.audio.startsWith("http")).map(c => c.audio);
      const cachedTracks = tracks.filter(t => keys.includes(contentKey(profile, t)));
      const trackCaches = yield all(cachedTracks.map(a => call(dbGet, db, CONTENT_STORE, contentKey(profile, a))));

      const cimages = data.catalogItems.filter(c => c.image && c.image.startsWith("http")).map(c => c.image);
      const cachedCImages = cimages.filter(t => keys.includes(contentKey(profile, t)));
      const cimageCaches = yield all(cachedCImages.map(a => call(dbGet, db, CONTENT_STORE, contentKey(profile, a))));

      const simages = data.stories.filter(c => c.image && c.image.startsWith("http")).map(c => c.image);
      const cachedSImages = simages.filter(t => keys.includes(contentKey(profile, t)));
      const simageCaches = yield all(cachedSImages.map(a => call(dbGet, db, CONTENT_STORE, contentKey(profile, a))));

      cachedTracks.forEach((a, i) => {
        let cachedBlob = trackCaches[i];
        if (cachedBlob) {
          data.catalogItems.filter(c => c.audio === a).forEach(c => {
            c.audio = cachedBlob;
          });
        }
      });

      cachedCImages.forEach((a, i) => {
        let cachedBlob = cimageCaches[i];
        if (cachedBlob) {
          data.catalogItems.filter(c => c.image === a).forEach(c => {
            c.image = cachedBlob;
          });
        }
      });

      cachedSImages.forEach((a, i) => {
        let cachedBlob = simageCaches[i];
        if (cachedBlob) {
          data.stories.filter(c => c.image === a).forEach(c => {
            c.image = cachedBlob;
          });
        }
      });

      const preloadingAvatars = [];
      if (data.avatar && keys.includes(contentKey(profile, data.avatar))) {
        data.avatar = yield call(dbGet, db, CONTENT_STORE, contentKey(profile, data.avatar));
      } else {
        preloadingAvatars.push({ url: data.avatar, type: "image" });
      }
      if (data.avatarPreview && keys.includes(contentKey(profile, data.avatarPreview))) {
        data.avatarPreview = yield call(dbGet, db, CONTENT_STORE, contentKey(profile, data.avatarPreview));
      } else {
        preloadingAvatars.push({ url: data.avatarPreview, type: "image" });
      }

      yield put({
        type: SET_DATA,
        themes,
        buttonColors,
        backgrounds,
        config,
        account,
        data
      });

      const preloading = [...new Set(
        tracks.filter(t => !keys.includes(contentKey(profile, t))).map(url => { return { url, type: "audio" }})
          .concat(cimages.filter(t => !keys.includes(contentKey(profile, t))).map(url => { return { url, type: "image" }}))
          .concat(simages.filter(t => !keys.includes(contentKey(profile, t))).map(url => { return { url, type: "image" }}))
          .concat(preloadingAvatars))];
      if (preloading.length > 0) {
        yield put({
          type: PRELOAD_DATA,
          profile,
          contentUrls: preloading
        });
      }
    }
  }
  catch (error) {
    yield put({ type: LOADING_ERROR, error });
  }
}

function* preloadByUrl(url) {
  const blob = yield call(API.toDataUrl, url);
  if (!blob) {
    return null;
  }
  try {
    return yield call(fileReader, blob);
  } catch {
    return null;
  }
}

function* preloadData({ profile, contentUrls}) {
  const cachingBase64 = yield all(contentUrls.map(cu => call(preloadByUrl, cu.url)));
  const db = yield call(dbPromise, {});

  const cached = {};
  const putCalls = [];
  contentUrls.forEach((cu, i) => {
    const cachedBase64 = cachingBase64[i];
    if (cachedBase64) {
      cached[cu.url] = cachedBase64;
      putCalls.push(call(dbPut, db, CONTENT_STORE, 
        cu.type == "audio" ? cachedBase64.replace("data:video", "data:audio") : cachedBase64,
        contentKey(profile, cu)));
    }
  });
  yield all(putCalls);

  if (Object.keys(cached).length > 0) {
    yield put({ type: CACHE_DATA, cached });
  }
}

export default function* config() {
  yield takeEvery(CONFIG_LOAD, loadConfig);
  yield takeEvery(PRELOAD_DATA, preloadData);
}
