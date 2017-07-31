import React, { Component } from 'react';
import { StyleSheet, Text, Image, Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { Content, ListItem, Body, Left, Right } from 'native-base';
import { connect } from 'react-redux';

import { playerPauseResumeToggle, podcastSelect, sliderMove } from '../actions/podcasts';
import { getParsedDuration, getPodcastDetails, getProgress, getTimeSeek } from '../reducers/selectors';

class Podcast extends Component {
  shouldComponentUpdate(nextProps) {
    if(this.props.details.title !== 'title') { // Check if real data has been passed to avoid not rerendering for the first time
      return (
        nextProps.details.isPlaying || // Update for the playing podcast
        this.props.details.isPlaying !== nextProps.details.isPlaying || // Or update if the play button has been pressed
        !this.props.details.isPlaying && this.props.timeSeek !== nextProps.timeSeek // Or update if the slider was moved while podcast was paused
      );
    }
    return true;
  }
  componentDidUpdate(prevProps) {
    const { parsedDuration, timeSeek } = this.props;
    console.log('updated ' + this.props.details.id);
    if(prevProps.timeSeek !== timeSeek) { // Check if the slider has moved
      this.player.seek(this.props.timeSeek * parsedDuration); // Navigate to where the user released the slider
    }
  }
  openSoundcloudPodcast = link => {
    Linking.canOpenURL(link)
      .then(supported => {
        if (supported) {
          return Linking.openURL(link);
        }
      })
      .catch(err => Alert.alert('An error occurred', err));
  }
  render() {
    const { details, id, onPodcastSelect, parsedDuration, resetPlayButton, updateSlider } = this.props;
    const { duration, isPlaying, link, pubDate, thumbnail, title, url } = details;
    const date = pubDate.substring(5, 16);
    return (
      <Content>
        <Video
          onEnd={() => {
            this.player.seek(0); // Seek to the beginning of the podcast
            updateSlider(0); // Move slider to initial state
            resetPlayButton(); // Switch button to be pause state
          }}
          onProgress={value => updateSlider(value.currentTime / parsedDuration)} // Update the slider to automatically move with the playing podcast
          paused={!isPlaying}
          ref={ref => {
            this.player = ref;
          }}
          source={{ uri: url }}
          style={styles.video}
        />
        <ListItem avatar
         onLongPress={() => {
           Alert.alert(
             'Podcast details',
             `Title: ${title}\n\nPosted on: ${date}\n\nDuration: ${duration}`,
             [
               {
                 text: 'Visit on Soundcloud',
                 onPress: () => {
                   this.openSoundcloudPodcast(link);
                 },
               },
               {
                 text: 'Dismiss',
               },
             ],
           );
         }}
         onPress={() => {
           onPodcastSelect(id);
           this.player.seek(0);
         }}>
          <Left>
            <Image
              resizeMode="center"
              source={{ uri: thumbnail }}
              style={styles.img}
            />
          </Left>
          <Body>
            <Text>{ title }</Text>
            <Text note>{ date }</Text>
          </Body>
          <Right>
            <Text>🕓 { duration }</Text>
          </Right>
        </ListItem>
      </Content>
    );
  }
}

const makeMapStateToProps = () => {
  const getDetails = getPodcastDetails();
  const getDuration = getParsedDuration();
  const getSeek = getTimeSeek();
  const mapStateToProps = (state, ownProps) => {
    return {
      details: getDetails(state, ownProps),
      parsedDuration: getDuration(state, ownProps),
      progress: getProgress(state),
      timeSeek: getSeek(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => {
  return {
    onPodcastSelect: id => {
      dispatch(podcastSelect(id));
    },
    resetPlayButton: () => {
      dispatch(playerPauseResumeToggle());
    },
    updateSlider: value => {
      dispatch(sliderMove(value));
    },
  };
};

Podcast.propTypes = {
  details: PropTypes.shape({
    duration: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    pubDate: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  id: PropTypes.number.isRequired,
  onPodcastSelect: PropTypes.func.isRequired,
  parsedDuration: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  resetPlayButton: PropTypes.func.isRequired,
  timeSeek: PropTypes.number.isRequired,
  updateSlider: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: 75,
  },
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Podcast);
