import React, { Component } from 'react';
import { StyleSheet, Text, Image, Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { Content, ListItem, Body, Left, Right } from 'native-base';
import { connect } from 'react-redux';

import { podcastSelect, sliderMove } from '../actions/actions';
import { getParsedDuration, getPodcastDetails, getProgress, getTimeSeek } from '../reducers/selectors';

class Podcast extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Rerender only the currently playing podcast or if the playing status has changed
    if(this.props.details.title !== 'title') { // Check if real data has been passed
      return nextProps.details.isPlaying || this.props.details.isPlaying !== nextProps.details.isPlaying;
    }
    return true;
  }
  componentDidUpdate(prevProps) {
    const { parsedDuration, timeSeek } = this.props;
    if(prevProps.timeSeek !== timeSeek) { // Check if the slider has moved
      this.player.seek(this.props.timeSeek * parsedDuration); // Navigate to where the user released the slider
    }
  }
  openSoundcloudPodcast = link => {
    Linking.canOpenURL(link)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${link}`);
        } else {
          return Linking.openURL(link);
        }
      })
      .catch(err => Alert.alert('An error occurred', err));
  }
  render() {
    const { details, id, onPodcastSelect, parsedDuration, updateSlider } = this.props;
    const { duration, isPlaying, link, pubDate, thumbnail, title, url } = details;
    const date = pubDate.substring(5, 16);
    return (
      <Content>
        <Video
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
