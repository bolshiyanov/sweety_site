import { takeEvery, put } from 'redux-saga/effects';

import {
  CONFIG_LOAD,
  LOADING_ERROR,
  SET_DATA
} from 'constants/actions';

import mockData from 'mocks/data.json';

function* loadConfig() {
  try {
    // const data = yield call(superagent.get(mockData), {});
    const {
      themes,
      buttonColors,
      backgrounds,
      config,
      account,
      ...data
    } = mockData;

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
