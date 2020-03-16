import { takeEvery, put, call } from 'redux-saga/effects';

import {
  CONFIG_LOAD,
  LOADING_ERROR,
  SET_DATA
} from 'constants/actions';

import API from 'utils/api';
//import mockData from 'mocks/data.json';

function* loadConfig() {
  try {
    const mockData = yield call(API.getData, {});
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
