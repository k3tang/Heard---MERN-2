import { combineReducers } from "redux";
import { sessionErrorsReducer } from './session'
import { confessionErrorsReducer } from "./confessions";


export default combineReducers({
    session: sessionErrorsReducer,
    confessions: confessionErrorsReducer
});