// Structure of the news' list state tree
const newsInitialState = {
  data: [
    {
      author: 'author',
      content: 'content',
      link: 'link',
      pubDate: 'pubDate',
      title: 'title',
    },
  ],
  error: null,
  isLoading: false,
};

const newsReducer = (state = newsInitialState, action) => {
  switch(action.type) {
  case 'NEWS_ERROR':
    return {
      ...state,
      error: action.error,
    };
  case 'NEWS_LIST_LOADING':
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case 'NEWS_SUCCESS_FETCH':
    return {
      ...state,
      data: action.data,
    };
  default:
    return state;
  }
};

export { newsReducer };
