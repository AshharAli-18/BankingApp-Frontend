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


import {  loadAccountsSuccess, loadAccountsError, createaccountsuccess, createaccounterror, deleteAccountSucess, deleteAccountError } from "../actions";

import { getAccountsApi, deleteAccountApi, createAccountApi } from "../api";



 function* onLoadAccountsStartAsync (action) {
    try{
        const {token} = action.payload;
        const response = yield call(getAccountsApi, token);
        if(response.status === 200){
            yield delay(500);
            yield put(loadAccountsSuccess(response.data));
        }
    } catch(error) {
        yield put(loadAccountsError(error.response.data));
    }

}


function* onCreateAccountStartAsync (action) {
    try{
        const { token, account } = action.payload;
        const response = yield call(createAccountApi, token, account);
        if(response.status === 200){
            yield put(createaccountsuccess(response.data));
        }
    } catch(error) {
        yield put(createaccounterror(error.response.data));
    }

}




function* onDeleteAccountStartAsync (action) {
    try{
        const {token, accountId} = action.payload;
        const response = yield call(deleteAccountApi, {token, accountId});
        if(response.status === 200){
            yield delay(500);
            const {data} = response;
            yield put(deleteAccountSucess(data));
        }
    } catch(error) {
        yield put(deleteAccountError(error.response.data));
    }


}

function* onDeleteAccount() {
    while(true){
        const action = yield take(types.DELETE_ACCOUNT_REQUEST);
        yield call(onDeleteAccountStartAsync, action)
    }
}


function* onLoadAccounts() {
    yield takeEvery(types.LOAD_ALL_ACCOUNTS_REQUEST, onLoadAccountsStartAsync)
 
}


function* onCreateAccount() {
    yield takeLatest(types.CREATE_ACCOUNT_START, onCreateAccountStartAsync)
 
}

const accountsSaga = [
    fork(onLoadAccounts),
    fork(onDeleteAccount),
    fork(onCreateAccount),
];

export default function* rootAccountsSaga() {
    yield all([...accountsSaga]);
}