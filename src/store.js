import {applyMiddleware, createStore, combineReducers } from "redux";
import radiosReducer from "../src/reducers/radiosReducer";
import thunk from 'redux-thunk';

const applyMiddleware2 = applyMiddleware

const rootReducer = combineReducers({
    radiosReducer: radiosReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware2(thunk));

export default configureStore;



