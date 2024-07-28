import {
    take,
    takeEvery,
    takeLatest,
    put,
    all,
    delay,
    fork,
    call,
} from "redux-saga/effects";

import * as types from "../actiontypes"


import {  adminloginSuccess, adminloginFailure } from "../actions";

import { adminloginApi } from "../api";


function* handleAdminLoginRequest(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(adminloginApi, { email, password });
    const {data} = response;
    yield put(adminloginSuccess(data));
  } catch (error) {
    console.error("Login request failed:", error.message);
    yield put(adminloginFailure(error.message));
  }
}

  
function* watchFunctionLoginRequest() {
    yield takeLatest(types.ADMIN_LOGIN_REQUEST, handleAdminLoginRequest);
  }

const adminloginSaga = [
    fork(watchFunctionLoginRequest),
];

export default function* rootAdminLoginSaga() {
    yield all([...adminloginSaga]);
}