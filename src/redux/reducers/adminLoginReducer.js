import * as types from "../actiontypes"

// authReducer.js
const initialState = {
  user: null,
//   token: null,
  error: null,
};

const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload.data,
        // token: action.payload.token,
        error: null,
      };
    case types.ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        admin: null,
        token: null,
        error: action.payload,
      };
      case types.ADMIN_LOGOUT:
        return {
          ...state,
          admin: null,
          token: null,
          error: null,
        };
      
    default:
      return state;
  }
};

export default adminLoginReducer;

  