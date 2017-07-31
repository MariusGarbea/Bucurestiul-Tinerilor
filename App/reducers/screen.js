import { Dimensions } from 'react-native';

const screenInitialState = {
  screenWidth: Dimensions.get('window').width,
};

const screenReducer = (state = screenInitialState) => {
  return state;
};

export { screenReducer };
