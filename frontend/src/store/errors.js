import { combineReducers } from "redux";
import { sessionErrorsReducer } from './session'
import { confessionErrorsReducer } from "./confessions";
import { topicErrorsReducer } from "./topics";

export default combineReducers({
    session: sessionErrorsReducer,
    confessions: confessionErrorsReducer,
    topics: topicErrorsReducer
});