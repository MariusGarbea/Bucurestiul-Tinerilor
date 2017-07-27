// Structure of the events' list state tree
const eventsInitialState = {
  data: [
    {
      description: 'description',
      endTime: 'endTime',
      id: 'ID',
      name: 'name',
      place: {
        name: 'placeName',
        location: {
          city: 'city',
          country: 'country',
          latitude: 0,
          longitude: 0,
          street: 'street',
        },
        id: 'placeID',
      },
      startTime: 'startTime',
    },
  ],
  error: null,
  isLoading: false,
};

const eventReducer = (state = eventsInitialState, action) => {
  switch(action.type) {
  case 'EVENT_ERROR':
    return {
      ...state,
      error: action.error,
    };
  case 'EVENT_LIST_LOADING':
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case 'EVENT_SUCCESS_FETCH':
    return {
      ...state,
      data: action.data,
    };
  default:
    return state;
  }
};

export { eventReducer };
