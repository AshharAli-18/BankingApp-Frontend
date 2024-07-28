import axios from "axios";

const BASE_URL = "http://localhost:8080/";

// login API
export const customerloginApi = async ({ email, password }) =>
    axios.post(`${BASE_URL}api/auth/loginCustomer`, { email, password });

export const adminloginApi = async ({ email, password }) =>
  axios.post(`${BASE_URL}api/auth/loginAdmin`, { email, password });
  
// all accounts API
export const getAccountsApi = (token) => {
    return axios.get(`${BASE_URL}api/getAllAccounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const createAccountApi = (account ,token) => {
  const trimmedToken = token.trim();
    return axios.post(`${BASE_URL}api/admin/createAccount`, account, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const deleteAccountApi=(accountId, token)=>{
  return axios.delete(`${BASE_URL}api/admin/deleteAccount/${accountId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// load all transactions API
export const getTransfersApi = (token) => {
  return axios.get(`${BASE_URL}api/getAllTransfers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTransactionsByTransferIdApi = (token, transferId) => {
  return axios.get(`${BASE_URL}api/getTransactionByTransferId/${transferId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

