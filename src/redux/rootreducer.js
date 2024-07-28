import { combineReducers } from "redux";


import customerLoginReducer from "./reducers/customerLoginReducer";
import adminLoginReducer from "./reducers/adminLoginReducer";
import accountsReducer from "./reducers/accountsReducer";
import transfersReducer from "./reducers/transfersReducer";
import transactionbytransferreducer from "./reducers/transactionsbytransferreducer";

const rootReducer= combineReducers({
   customerloginuser: customerLoginReducer,
   adminloginuser: adminLoginReducer, 
   accounts: accountsReducer,
   transfers: transfersReducer,
   transactionsbytransferid: transactionbytransferreducer,
})

export default rootReducer;