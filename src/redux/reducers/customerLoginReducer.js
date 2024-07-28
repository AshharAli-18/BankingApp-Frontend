import * as types from "../actiontypes"

// authReducer.js
const initialState = {
  user: null,
//   token: null,
  error: null,
};

const customerLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CUSTOMER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        // token: action.payload.token,
        error: null,
      };
    case types.CUSTOMER_LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        error: action.payload,
      };
      case types.CUSTOMER_LOGOUT:
        return {
          ...state,
          user: null,
          token: null,
          error: null,
        };
      
    default:
      return state;
  }
};

export default customerLoginReducer;

  