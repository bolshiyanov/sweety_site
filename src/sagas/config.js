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

const DATABASE_NAME = "Sweety";
const DATABASE_VERSION = 3;
const PROFILE_STORE = "profile";
const CONTENT_STORE = "content";

function dbPromise() {
  return openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      switch (oldVersion) {
        case 0:
          db.createObjectStore(PROFILE_STORE);
          db.createObjectStore(CONTENT_STORE);
        case 1:
          db.createObjectStore(CONTENT_STORE);
        case 2:
          db.clear(CONTENT_STORE);
      }
    }
  });
}

function dbPut(db, storeName, value, query) {
  return db.put(storeName, value, query);
}

function dbGet(db, storeName, query) {
  return db.get(storeName, query);
}

function dbGetAllKeys(db, storeName) {
  return db.getAllKeys(storeName);
}

function contentKey(profile, key) {
  return `${profile}:${key}`;
}

function* loadConfig({ profile }) {
  try {
    let loadingData = null;
    const db = yield call(dbPromise, {});
    try {
      loadingData = yield call(API.getData, {});
      yield call(dbPut, db, PROFILE_STORE, loadingData, profile);
    } catch (error) {
      loadingData = yield call(dbGet, db, PROFILE_STORE, profile);
    }
    const {
      themes,
      buttonColors,
      backgrounds,
      config,
      account,
      ...data
    } = loadingData;

    const tracks = data.catalogItems.filter(c => c.audio && c.audio.startsWith("http")).map(c => c.audio);
    const keys = yield call(dbGetAllKeys, db, CONTENT_STORE);

    const cachedTracks = tracks.filter(t => keys.includes(contentKey(profile, t)));
    const cachedBlobs = yield all(cachedTracks.map(a => call(dbGet, db, CONTENT_STORE, contentKey(profile, a))));

    cachedTracks.forEach((a, i) => {
      let cachedBlob = cachedBlobs[i];
      if (cachedBlob) {
        data.catalogItems.filter(c => c.audio === a).forEach(c => {
          c.audio = cachedBlob;
        });
      }
    });

    yield put({
      type: SET_DATA,
      themes,
      buttonColors,
      backgrounds,
      config,
      account,
      data
    });

    yield put({
      type: PRELOAD_DATA,
      profile,
      contentUrls: [...new Set(tracks.filter(t => !keys.includes(contentKey(profile, t))))]
    });
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
  const cachingBase64 = yield all(contentUrls.map(url => call(preloadByUrl, url)));
  const db = yield call(dbPromise, {});

  const cached = [];
  contentUrls.forEach((url, i) => {
    const cachedBase64 = cachingBase64[i];
    if (cachedBase64) {
      cached.push(url, cachedBase64);
      call(dbPut, db, CONTENT_STORE, cachedBase64.replace("data:video", "data:audio"), contentKey(profile, url));
    }
  });

  yield put({ type: CACHE_DATA, cached });
}

export default function* config() {
  yield takeEvery(CONFIG_LOAD, loadConfig);
  yield takeEvery(PRELOAD_DATA, preloadData);
}
