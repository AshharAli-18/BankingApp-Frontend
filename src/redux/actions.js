import * as types from "./actiontypes" 
  
// Actions for Customer login
export const customerloginRequest = (email, password) => ({
    type: types.CUSTOMER_LOGIN_REQUEST,
    payload: { email, password },
 });
 
export const customerloginSuccess = (data) => ({
    type: types.CUSTOMER_LOGIN_SUCCESS,
    payload: {data},
 });
 
 
 export const customerloginFailure = (error) => ({
    type: types.CUSTOMER_LOGIN_FAILURE,
    payload: error,
 });

export const customerlogout = () => ({
 type: types.CUSTOMER_LOGOUT,
});

// Actions for Admin login
export const adminloginRequest = (email, password) => ({
   type: types.ADMIN_LOGIN_REQUEST,
   payload: { email, password },
});

export const adminloginSuccess = (data) => ({
   type: types.ADMIN_LOGIN_SUCCESS,
   payload: {data},
});


export const adminloginFailure = (error) => ({
   type: types.ADMIN_LOGIN_FAILURE,
   payload: error,
});

export const adminlogout = () => ({
type: types.ADMIN_LOGOUT,
});

//Actions for loading all accounts
export const loadAccountsRequest = (token) => ({
   type: types.LOAD_ALL_ACCOUNTS_REQUEST,
   payload: {token},
});

export const loadAccountsSuccess = (accounts) => ({
    type: types.LOAD_ALL_ACCOUNTS_SUCCESS,
    payload: accounts,
 });

 export const loadAccountsError = (error) => ({
    type: types.LOAD_ALL_ACCOUNTS_FAILURE,
    payload: error,
 });

  // Action for add account
  export const createaccountstart = (account, token) => ({
   type: types.CREATE_ACCOUNT_START,
   payload: {account, token},
});

export const createaccountsuccess = () => ({
    type: types.CREATE_ACCOUNT_SUCCESS,
 });

 export const createaccounterror = (error) => ({
    type: types.CREATE_ACCOUNT_ERROR,
    payload: error,
 });


//Actions for deleting account
export const deleteAccountRequest = (accountId, token) => ({
   type: types.DELETE_ACCOUNT_REQUEST,
   payload: {accountId, token},
});

export const deleteAccountSucess= (accountId) => ({
    type: types.DELETE_ACCOUNT_SUCCESS,
    payload: accountId,
 });

 export const deleteAccountError = (error) => ({
    type: types.DELETE_ACCOUNT_FAILURE,
    payload: error,
 });

 
//Actions for loading all transfers
export const loadTransfersRequest = (token) => ({
   type: types.LOAD_ALL_TRANSFER_REQUEST,
   payload: {token},
});

export const loadTransfersSuccess = (transfers) => ({
    type: types.LOAD_ALL_TRANSFER_SUCCESS,
    payload: transfers,
 });

 export const loadTransfersError = (error) => ({
    type: types.LOAD_ALL_TRANSFER_FAILURE,
    payload: error,
 });


 export const loadTransactionsByTransferRequest = (token, transferId) => ({
   type: types.LOAD_TRANSACTION_TRANSFER_REQUEST,
   payload: { token, transferId },
 });
 

export const loadTransactionsByTransferSuccess = (transactions) => ({
    type: types.LOAD_TRANSACTION_TRANSFER_SUCCESS,
    payload: transactions,
 });

 export const loadTransactionsByTransferError = (error) => ({
    type: types.LOAD_TRANSACTION_TRANSFER_FAILURE,
    payload: error,
 });