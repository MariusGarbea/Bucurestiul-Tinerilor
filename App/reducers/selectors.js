import { createSelector } from 'reselect';

// Screen width selector
const getScreenWidth = createSelector(
  state => state.screenReducer.screenWidth,
  width => {
    return width;
  }
);

// Initial fetch selectors
const getFetchData = createSelector(
  state => state.podcastReducer.data,
  data => {
    return data;
  }
);

const getError = createSelector(
  state => state.podcastReducer.error,
  error => {
    return error;
  }
);

const getLoadingStatus = createSelector(
  state => state.podcastReducer.isLoading,
  isLoading => {
    return isLoading;
  }
);

// Podcast selectors
const getPodcastDetails = () => createSelector(
  (state, ownProps) => state.podcastReducer.data[ownProps.id],
  podcast => {
    return podcast;
  }
);

const getTimeSeek = createSelector(
  state => state.podcastReducer.timeSeek,
  timeSeek => {
    return timeSeek;
  }
);

// Podcast player selectors
const getPodcastCurrentlyOn = state => state.podcastReducer.podcastCurrentlyOn;
const getPodcasts = state => state.podcastReducer.data;

const getCurrentlyPlayingPodcast = createSelector(
  [getPodcasts, getPodcastCurrentlyOn],
  (podcasts, currentlyActivePodcast) => {
    return podcasts.filter(podcast => podcast.id === currentlyActivePodcast)[0];
  }
);

const isAnyPodcastPlaying = createSelector(
  getPodcasts,
  podcasts => { // Check whether every podcast is paused
    let playing = false;
    podcasts.map(podcast => {
      if(podcast.isPlaying) {
        playing = true;
      }
    });
    return playing;
  }
);

const getParsedDuration = () => createSelector(
  (state, ownProps) => state.podcastReducer.data[ownProps.id].duration,
  durationString => { // Transform podcasts's duration from string to int, in seconds
    return parseInt(durationString.substring(0, 2), 10) * 3600
      + parseInt(durationString.substring(3, 5), 10) * 60
      + parseInt(durationString.substring(6, 8), 10);
  }
);

export {
  getCurrentlyPlayingPodcast, getError, getFetchData, getLoadingStatus,
  getPodcastDetails, getScreenWidth, getTimeSeek, isAnyPodcastPlaying,
  getParsedDuration,
};
