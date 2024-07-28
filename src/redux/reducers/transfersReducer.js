import * as types from "../actiontypes"

const initialState={
    transfers: [],
    loading: false,
    error: null
};

const transfersReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_ALL_TRANSFER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_ALL_TRANSFER_SUCCESS:
            return {
                ...state,
                loading: false,
                transfers: action.payload,
            };
        case types.LOAD_ALL_TRANSFER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default transfersReducer;