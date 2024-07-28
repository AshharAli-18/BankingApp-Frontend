import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { all, fork } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage'; // Defaults to local storage
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from "./rootreducer";
import rootCustomerLoginSaga from "./sagas/customerLoginSaga";
import rootAdminLoginSaga from "./sagas/adminLoginSaga";
import rootAccountsSaga from "./sagas/accountsSaga";
import rootTransfersSaga from "./sagas/transferSaga";
import rootTransactionByTransferSaga from "./sagas/transactionByTransferSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === "development"){
    middlewares.push(logger)
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

function* rootSaga() {
    yield all([
      fork(rootCustomerLoginSaga ),
      fork(rootAdminLoginSaga ),
      fork(rootAccountsSaga ),
      fork(rootTransfersSaga),
      fork(rootTransactionByTransferSaga),
    ]);
  }

sagaMiddleware.run(rootSaga);

export default store;