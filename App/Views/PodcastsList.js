import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import Podcast from '../Components/Podcast';
import PodcastPlayer from '../Components/PodcastPlayer';
import SpinnerHOC from '../Components/SpinnerHOC';
import { podcastItemsFetchData } from '../actions/actions';
import { getError, getFetchData, getLoadingStatus } from '../reducers/selectors';

const PodcastWithSpinner = SpinnerHOC(View);

const podcastsEndpoint = 'http://feeds.soundcloud.com/users/soundcloud:users:312765325/sounds.rss';

class PodcastsList extends Component {
  componentDidMount() {
    const { fetchPodcastData } = this.props;
    fetchPodcastData(podcastsEndpoint);
  }
  fetchHasErrored = () => (
    Alert.alert(
      'Oops',
      `An error has occurred. Error details: ${this.props.error}`,
      [
        {
          text: 'Retry',
          onPress: () => {
            this.props.fetchPodcastData(podcastsEndpoint);
          },
        },
        {
          text: 'Cancel',
        },
      ],
      {
        cancelable: false,
      }
    )
  )
  render() {
    const { data, error, isLoading } = this.props;
    const podcasts = data.map(item => {
      return (
        <Podcast
          id={item.id}
          key={item.id}
        />
      );
    });
    if(error) {
      return this.fetchHasErrored();
    }
    return (
      <Container>
        <PodcastWithSpinner spinner={isLoading}>
          { podcasts }
        </PodcastWithSpinner>
        <PodcastPlayer />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: getFetchData(state),
    error: getError(state),
    isLoading: getLoadingStatus(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPodcastData: url => dispatch(podcastItemsFetchData(url)),
  };
};

PodcastsList.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  fetchPodcastData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(PodcastsList);
