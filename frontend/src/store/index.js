import { applyMiddleware, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from 'redux-thunk';

import { isAuthenticated, getUser } from '../services/auth'
import { setCurrentUser } from './actions/user';
import history from "../routes/history";
import rootReducer from './reducers';


const middlewares = [routerMiddleware(history), thunk];

const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(...middlewares)
);

if (isAuthenticated()) {
  store.dispatch(setCurrentUser(getUser()));
}

export default store
