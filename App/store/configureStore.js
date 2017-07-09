import { createStore } from 'redux';
import rootReducer from '../reducers/combineReducers';

export default createStore(rootReducer);