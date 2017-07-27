import parseXML from 'react-native-xml2js';

const newsItemsFetchData = url => {
  return async dispatch => {
    dispatch(newsListLoading(true));
    try {
      const response = await fetch(url);
      dispatch(newsListLoading(false));
      const responseTXT = await response.text();
      parseXML.parseString(responseTXT, (error, result) => { // Parse the XML to JSON
        if (error) {
          throw new Error(error);
        }
        const rawData = result.rss.channel[0].item;
        const data = rawData.map(item => ({ // Create a new object which will become part of the app's state
          author: item['dc:creator'][0],
          content: item['content:encoded'][0],
          link: item.link[0],
          pubDate: item.pubDate[0],
          title: item.title[0],
        }));
        dispatch(newsSuccessFetch(data));
      });
    } catch(error) {
      dispatch(newsError(error));
    }
  };
};

const newsError = error => ({
  type: 'NEWS_ERROR',
  error,
});

const newsListLoading = bool => ({
  type: 'NEWS_LIST_LOADING',
  isLoading: bool,
});

const newsSuccessFetch = data => ({
  type: 'NEWS_SUCCESS_FETCH',
  data,
});

export { newsItemsFetchData, newsError, newsListLoading, newsSuccessFetch };
