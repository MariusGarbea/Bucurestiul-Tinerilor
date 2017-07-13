// Structure of the app's state
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

const reducer = (state = podcastInitialState, action) => {
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

export default reducer;
