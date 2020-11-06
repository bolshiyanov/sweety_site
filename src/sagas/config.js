import { takeEvery, put, call, all } from 'redux-saga/effects';
import { openDB } from 'idb';

import {
  CONFIG_LOAD,
  LOADING_ERROR,
  SET_DATA
} from 'constants/actions';

import API from 'utils/api';
//import loadingData from 'mocks/data.json';

const DATABASE_NAME = "Sweety";
const DATABASE_VERSION = 2;
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

function* loadConfig({ profile }) {
  try {
    let loadingData = null;
    const db = yield call(dbPromise, {});
    try {
      loadingData = yield call(API.getData, {});
      yield call(dbPut, db, PROFILE_STORE, loadingData, profile);
    } catch {
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
    const key = (k) => `${profile}:${k}`;
    const cachedBlobs = yield all(tracks.map(a => 
      keys.includes(key(a)) ? call(dbGet, db, CONTENT_STORE, key(a)) : call(API.toDataUrl, a)));

    tracks.forEach((a, i) => {
      let cachedBlob = cachedBlobs[i];
      if (cachedBlob) {
        data.catalogItems.filter(c => c.audio === a).forEach(c => {
          c.audio = cachedBlob;
        });
      }
      if (!keys.includes(key(a))) {
        call(dbPut, db, CONTENT_STORE, cachedBlob, key(a));
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
  }
  catch (error) {
    yield put({ type: LOADING_ERROR, error });
  }
}

export default function* config() {
  yield takeEvery(CONFIG_LOAD, loadConfig);
}
