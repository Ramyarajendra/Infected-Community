import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as Reducers from './reducers/index'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [
  thunk
]

const rootReducer = combineReducers({
  ...Reducers
});

export default () =>  createStore(rootReducer, 
  composeEnhancer( applyMiddleware(...middlewares)))