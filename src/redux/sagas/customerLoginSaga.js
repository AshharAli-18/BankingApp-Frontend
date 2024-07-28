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


import {  customerloginSuccess, customerloginFailure } from "../actions";

import { customerloginApi } from "../api";


function* handleCustomerLoginRequest(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(customerloginApi, { email, password });
    const {data} = response;
    yield put(customerloginSuccess(data));
  } catch (error) {
    console.error("Login request failed:", error.message);
    yield put(customerloginFailure(error.message));
  }
}

  
function* watchFunctionLoginRequest() {
    yield takeLatest(types.CUSTOMER_LOGIN_REQUEST, handleCustomerLoginRequest);
  }

const customerloginSaga = [
    fork(watchFunctionLoginRequest),
];

export default function* rootCustomerLoginSaga() {
    yield all([...customerloginSaga]);
}