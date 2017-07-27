import { combineReducers } from 'redux';
import { podcastReducer } from './podcasts';
import { screenReducer } from './screen';
import { eventReducer } from './events';
import { newsReducer } from './news';

export default combineReducers({
  eventReducer,
  newsReducer,
  podcastReducer,
  screenReducer,
});
