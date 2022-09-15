import {combineReducers} from "redux";
import {legacy_createStore as createStore, applyMiddleware} from "redux";
import listReducer from "./pageReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    list: listReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))