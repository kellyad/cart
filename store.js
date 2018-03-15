import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/store/reducers/index'; //Import the reducer
// Connect our store to the reducers
let store = createStore(reducers, applyMiddleware(thunk));
export default store;