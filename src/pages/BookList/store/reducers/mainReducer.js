import { combineReducers } from "redux";
import bookReducer from "./bookReducer";

const mainReducer = combineReducers({
    books: bookReducer,
});

export default mainReducer;