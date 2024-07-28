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


import {   loadTransactionsByTransferSuccess, loadTransactionsByTransferError } from "../actions";

import { getTransactionsByTransferIdApi} from "../api";



//  function* onLoadTransactionStartAsync (action) {
//     try{
//         const {token, transferId} = action.payload;
//         const response = yield call(getTransactionsByTransferIdApi, {token, transferId});
//         if(response.status === 200){
//             yield delay(500);
//             yield put(loadTransactionsByTransferSuccess(response.data));
//         }
//     } catch(error) {
//         yield put(types.LOAD_TRANSACTION_TRANSFER_FAILURE(error.response.data));
//     }

// }

function* onLoadTransactionStartAsync(action) {
    try {
      const { token, transferId } = action.payload;
      console.log("Token used:", token); // Log the token for debugging
      const response = yield call(getTransactionsByTransferIdApi, token, transferId);
      if (response.status === 200) {
        yield delay(500);
        yield put(loadTransactionsByTransferSuccess(response.data));
      }
    } catch (error) {
      yield put(loadTransactionsByTransferError(error.response.data)); // Fixed error action
    }
  }
  


function* onLoadTransactions() {
    yield takeEvery(types.LOAD_TRANSACTION_TRANSFER_REQUEST, onLoadTransactionStartAsync)
 
}

const transactionByTransferSaga = [
    fork(onLoadTransactions),
    // fork(onDeleteOrder)
];

export default function* rootTransactionByTransferSaga() {
    yield all([...transactionByTransferSaga]);
}