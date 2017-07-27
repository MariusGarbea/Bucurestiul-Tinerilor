const eventItemsFetchData = url => {
  return async dispatch => {
    dispatch(eventListLoading(true));
    try {
      const response = await fetch(url);
      dispatch(eventListLoading(false));
      const responseJSON = await response.json();
      const events = responseJSON.data.map(item => ({
        description: item.description,
        endTime: item.end_time,
        id: item.id,
        name: item.name,
        place: item.place,
        startTime: item.start_time,
      }));
      dispatch(eventSuccessFetch(events));
    } catch(error) {
      dispatch(eventError(error));
    }
  };
};

const eventError = error => ({
  type: 'EVENT_ERROR',
  error,
});

const eventListLoading = bool => ({
  type: 'EVENT_LIST_LOADING',
  isLoading: bool,
});

const eventSuccessFetch = data => ({
  type: 'EVENT_SUCCESS_FETCH',
  data,
});

export { eventItemsFetchData, eventError, eventListLoading, eventSuccessFetch };
