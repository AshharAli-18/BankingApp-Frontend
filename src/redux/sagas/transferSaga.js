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


import {  loadTransfersRequest, loadTransfersSuccess, loadTransfersError } from "../actions";

import { getTransfersApi } from "../api";



 function* onLoadTransfersStartAsync (action) {
    try{
        const {token} = action.payload;
        const response = yield call(getTransfersApi, token);
        if(response.status === 200){
            yield delay(500);
            yield put(loadTransfersSuccess(response.data));
        }
    } catch(error) {
        yield put(loadTransfersError(error.response.data));
    }

}


function* onLoadTransfers() {
    yield takeEvery(types.LOAD_ALL_TRANSFER_REQUEST, onLoadTransfersStartAsync)
 
}

const transfersSaga = [
    fork(onLoadTransfers),
    // fork(onDeleteOrder)
];

export default function* rootTransfersSaga() {
    yield all([...transfersSaga]);
}