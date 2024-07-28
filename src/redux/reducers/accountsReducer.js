import * as types from "../actiontypes"

const initialState={
    accounts: [],
    loading: false,
    error: null
};

const accountsReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_ALL_ACCOUNTS_REQUEST:
        case types.DELETE_ACCOUNT_REQUEST:
        case types.CREATE_ACCOUNT_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_ALL_ACCOUNTS_SUCCESS:
            return {
                ...state,
                loading: false,
                accounts: action.payload,
            };
        case types.CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                accounts: state.accounts.filter((item)=> item.id !== action.payload),
            };
        case types.LOAD_ALL_ACCOUNTS_FAILURE:
        case types.DELETE_ACCOUNT_FAILURE:
        case types.CREATE_ACCOUNT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default accountsReducer;