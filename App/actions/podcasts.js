import parseXML from 'react-native-xml2js';

const playerPauseResumeToggle = () => ({
  type: 'PLAYER_PAUSE_RESUME_TOGGLE',
});

const podcastItemsFetchData = url => {
  return async dispatch => {
    dispatch(podcastListLoading(true));
    try {
      const response = await fetch(url);
      dispatch(podcastListLoading(false));
      const responseTXT = await response.text();
      parseXML.parseString(responseTXT, (error, result) => { // Parse the XML to JSON
        if (error) {
          throw new Error(error);
        }
        const rawData = result.rss.channel[0].item;
        const data = rawData.map((item, index) => ({ // Create a new object which will become part of the app's state
          duration: item['itunes:duration'][0],
          id: index,
          isPlaying: false,
          link: item.link[0],
          pubDate: item.pubDate[0],
          thumbnail: item['itunes:image'][0].$.href,
          title: item.title[0],
          url: item.enclosure[0].$.url,
        }));
        dispatch(podcastSuccessFetch(data));
      });
    } catch(error) {
      dispatch(podcastError(error));
    }
  };
};

const podcastError = error => ({
  type: 'PODCAST_ERROR',
  error,
});

const podcastListLoading = bool => ({
  type: 'PODCAST_LIST_LOADING',
  isLoading: bool,
});

const podcastSelect = id => ({
  type: 'PODCAST_SELECT',
  id,
});

const podcastSuccessFetch = data => ({
  type: 'PODCAST_SUCCESS_FETCH',
  data,
});

const sliderMove = value => ({
  type: 'SLIDER_MOVE',
  value,
});

const timeSeek = value => ({
  type: 'TIME_SEEK',
  value,
});

export {
  playerPauseResumeToggle, podcastItemsFetchData, podcastError,
  podcastListLoading, podcastSelect, podcastSuccessFetch,
  sliderMove, timeSeek,
};
