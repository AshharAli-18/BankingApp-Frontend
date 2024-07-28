import * as types from "../actiontypes"

const initialState={
    transactions: [],
    loading: false,
    error: null
};

const transactionbytransferreducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_TRANSACTION_TRANSFER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_TRANSACTION_TRANSFER_SUCCESS:
            return {
                ...state,
                loading: false,
                transfers: action.payload,
            };
        case types.LOAD_TRANSACTION_TRANSFER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default transactionbytransferreducer;