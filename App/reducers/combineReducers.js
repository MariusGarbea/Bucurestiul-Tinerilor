import { combineReducers } from 'redux';
import { podcastReducer, screenReducer } from './reducer';

export default combineReducers({
  podcastReducer,
  screenReducer,
});
