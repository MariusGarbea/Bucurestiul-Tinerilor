// Structure of the podcast's state tree
const podcastInitialState = {
  data: [
    {
      duration: 'duration',
      id: 0,
      isPlaying: false,
      link: 'link',
      pubDate: 'pubDate',
      thumbnail: 'thumbnail',
      timeSeek: 0,
      title: 'title',
      url: 'url',
    },
  ],
  hasErrored: false,
  isLoading: false,
  podcastCurrentlyOn: 0,
};

const screenInitialState = {
  screenWidth: 0,
};

const podcastReducer = (state = podcastInitialState, action) => {
  switch(action.type) {
  case 'PODCAST_ERROR':
    return {
      ...state,
      error: action.error,
    };
  case 'PODCAST_LIST_LOADING':
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case 'PODCAST_SUCCESS_FETCH':
    return {
      ...state,
      data: action.data,
    };
  case 'PLAYER_PAUSE_RESUME_TOGGLE':
    return {
      ...state,
      data: state.data.map(podcast =>
        (podcast.id === state.podcastCurrentlyOn) // Find the currently playing podcast
          ? { ...podcast, isPlaying: !podcast.isPlaying }
          : { ...podcast, isPlaying: false }
      ),
    };
  case 'PODCAST_SELECT':
    return {
      ...state,
      podcastCurrentlyOn: action.id,
      data: state.data.map(podcast =>
        (podcast.id === action.id)
          ? { ...podcast, isPlaying: true }
          : { ...podcast, isPlaying: false }
        ),
    };
  case 'SLIDER_MOVE':
    return {
      ...state,
      data: state.data.map(podcast =>
        (podcast.id === state.podcastCurrentlyOn)
          ? { ...podcast, timeSeek: action.value }
          : { ...podcast }
        ),
    };
  default:
    return state;
  }
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

const parseDurationString = durationString => ( // Transform podcasts's duration from string to int, in seconds
  parseInt(durationString.substring(0, 2), 10) * 3600
  + parseInt(durationString.substring(3, 5), 10) * 60
  + parseInt(durationString.substring(6, 8), 10)
);

export { parseDurationString, podcastReducer, screenReducer };
