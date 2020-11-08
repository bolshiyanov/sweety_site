import { takeEvery, put, call, all } from 'redux-saga/effects';
import { openDB } from 'idb';
import { uuid } from 'uuidv4';

import {
  CONFIG_LOAD,
  CONFIG_LOAD_ONLINE,
  LOADING_ERROR,
  SET_DATA,
  PRELOAD_DATA,
  CACHE_DATA,
  CACHE_PLAYLISTS,
  PRELOAD_PLAYLISTS
} from 'constants/actions';

import API from 'utils/api';
import fileReader from 'utils/fileReader';
//import loadingData from 'mocks/data.json';

const DATABASE_NAME = "SweetyLink";
const DATABASE_VERSION = 1;
const PROFILE_STORE = "profile";
const CONTENT_STORE = "content";
const LOADING_ATTEMPTS = 10;

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
  if (!db) {
    return Promise.resolve(null);
  }

  try {
    return db.put(storeName, value, query);
  } catch (error) {
    console.warn(error);
    return Promise.resolve(null);
  }
}

function dbGet(db, storeName, query) {
  if (!db) {
    return Promise.resolve(null);
  }

  try {
    return db.get(storeName, query);
  } catch (error) {
    console.warn(error);
    return Promise.resolve(null);
  }
}

function dbGetAllKeys(db, storeName) {
  if (!db) {
    return Promise.resolve([]);
  }

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

function* processLoadingData(loadingData, profile) {
  let db = null;
  try {
    db = yield call(dbPromise, {});
  } catch {
  }

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

  const bimages = data.blocks.filter(c => c.image && c.image.startsWith("http")).map(c => c.image);
  const cachedBImages = bimages.filter(t => keys.includes(contentKey(profile, t)));
  const bimageCaches = yield all(cachedBImages.map(a => call(dbGet, db, CONTENT_STORE, contentKey(profile, a))));

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

  cachedBImages.forEach((a, i) => {
    let cachedBlob = bimageCaches[i];
    if (cachedBlob) {
      data.blocks.filter(c => c.image === a).forEach(c => {
        c.image = cachedBlob;
      });
    }
  });

  data.catalogItems.forEach(ci => {
    if (ci.text?.startsWith("https://docs.google.com")) {
      ci.playlistUrl = ci.text;
      ci.text = null;
      ci.textEn = null;
      ci.textEs = null;
      ci.textRu = null;
      ci.textIt = null;
      ci.textDe = null;
      ci.textFr = null;
    }
  });
  const playlists = data.catalogItems.filter(ci => ci.playlistUrl).map(ci => ci.playlistUrl);
  const cachedPlaylists = playlists.filter(t => keys.includes(contentKey(profile, t)));
  const playlistCaches = yield all(cachedPlaylists.map(a => call(dbGet, db, CONTENT_STORE, contentKey(profile, a))));
  data.catalogItems.filter(ci => ci.playlistUrl).forEach(ci => {
    const cachedIndex = cachedPlaylists.indexOf(ci.playlistUrl);
    ci.playlist = cachedIndex > -1 ? playlistCaches[cachedIndex] : [];
    ci.audio = ci.playlist[0]?.audio;
    ci.text = ci.playlist[0]?.text;
    // TODO. Find appropriate track
  });

  const preloadingAvatars = [];
  if (data.avatar && keys.includes(contentKey(profile, data.avatar))) {
    data.avatar = yield call(dbGet, db, CONTENT_STORE, contentKey(profile, data.avatar));
  } else if (data.avatar) {
    preloadingAvatars.push({ url: data.avatar, type: "image" });
  }
  if (data.avatarPreview && keys.includes(contentKey(profile, data.avatarPreview))) {
    data.avatarPreview = yield call(dbGet, db, CONTENT_STORE, contentKey(profile, data.avatarPreview));
  } else if (data.avatarPreview) {
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
      .concat(bimages.filter(t => !keys.includes(contentKey(profile, t))).map(url => { return { url, type: "image" }}))
      .concat(preloadingAvatars))];
  if (preloading.length > 0) {
    yield put({
      type: PRELOAD_DATA,
      profile,
      contentUrls: preloading
    });
  }

  const preloadingPlaylists = [...new Set(
    playlists.filter(t => !keys.includes(contentKey(profile, t))))];
  if (preloadingPlaylists.length > 0) {
    yield put({
      type: PRELOAD_PLAYLISTS,
      profile,
      playlists: preloadingPlaylists
    });
  }
}

function* loadConfig({ profile }) {
  try {
    let loadingData = null;
    let db = null;
    try
    {
      db = yield call(dbPromise, {});
    } catch { }

    loadingData = yield call(dbGet, db, PROFILE_STORE, profile);
    if (!loadingData) {
      yield loadConfigOnline({ profile });

      loadingData = yield call(dbGet, db, PROFILE_STORE, profile);

      if (!loadingData) {
        yield put({ type: LOADING_ERROR, error: "No data" });
      }
    } else {
      yield call(processLoadingData, loadingData, profile);

      yield put({ type: CONFIG_LOAD_ONLINE, profile });
    }
  }
  catch (error) {
    yield put({ type: LOADING_ERROR, error });
  }
}

function* loadConfigOnline({ profile }) {
  try {
    let loadingData = null;
    let db = null;
    try {
      db = yield call(dbPromise, {});
    } catch { }
    const loadingDataOffline = yield call(dbGet, db, PROFILE_STORE, profile);

    let loading = 0;
    while (!loadingData && loading < LOADING_ATTEMPTS) {
      loadingData = yield call(API.getData, {});
      if (loadingData != null) {
        if (loadingDataOffline && JSON.stringify(loadingDataOffline) === JSON.stringify(loadingData)) {
          return;
        }
        yield call(dbPut, db, PROFILE_STORE, loadingData, profile);
      }
      loading++;
    }
    if (loadingData) {
      yield call(processLoadingData, loadingData, profile);
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
        contentKey(profile, cu.url)));
    }
  });
  yield all(putCalls);

  if (Object.keys(cached).length > 0) {
    yield put({ type: CACHE_DATA, cached });
  }
}

function* preloadPlaylists({ profile, playlists}) {
  const db = yield call(dbPromise, {});

  const googleSheets = yield all(playlists.map(l => call(API.getGoogleSpreadSheet, l)));
  const contentList = googleSheets.map((rows, i) => {
    const items = rows.filter(row => row.audio).map(row => {
      return {
        guid: uuid(),
        number: row.number?.trim(),
        timeFrom: row.timeFrom?.trim(),
        timeTo: row.timeTo?.trim(),
        text: row.text?.trim(),
        audio: row.audio?.trim(),
      };
    });
    return {
      url: playlists[i],
      items
    };
  });
  yield all(contentList.map(e => call(dbPut, db, CONTENT_STORE, 
    e.items,
    contentKey(profile, e.url))));

  const cached = {};
  contentList.forEach(e => {
    cached[e.url] = e.items
  });

  if (Object.keys(cached).length > 0) {
    yield put({ type: CACHE_PLAYLISTS, cached });
  }

  const keys = yield call(dbGetAllKeys, db, CONTENT_STORE);
  const preloading = [];
  contentList.forEach(l => {
    l.items.forEach(e => {
      if (e.audio && !keys.includes(contentKey(profile, e.audio))) {
        preloading.push(e.audio);
      }
    });
  });

  /*if (preloading.length > 0) {
    yield put({
      type: PRELOAD_DATA,
      profile,
      contentUrls: [...new Set(preloading)].map(url => { return { url, type: "audio" } })
    });
  }*/
}

export default function* config() {
  yield takeEvery(CONFIG_LOAD, loadConfig);
  yield takeEvery(CONFIG_LOAD_ONLINE, loadConfigOnline);
  yield takeEvery(PRELOAD_DATA, preloadData);
  yield takeEvery(PRELOAD_PLAYLISTS, preloadPlaylists);
}
