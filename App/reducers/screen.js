import { Dimensions } from 'react-native';

const screenInitialState = {
  screenWidth: Dimensions.get('window').width,
};

const screenReducer = (state = screenInitialState, action) => {
  switch(action.type) {
  case 'SCREEN_WIDTH_CHANGE':
    return {
      ...state,
      screenWidth: action.value,
    };
  default:
    return state;
  }
};

export { screenReducer };
