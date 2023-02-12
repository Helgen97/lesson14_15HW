import { combineReducers } from "redux";
import bookReducer from "./bookReducer";

const mainReducer = combineReducers({
    book: bookReducer,
});

export default mainReducer;