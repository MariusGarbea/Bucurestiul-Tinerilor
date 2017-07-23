import React, { Component } from 'react';
import { StyleSheet, Text, Image, Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Sound from 'react-native-sound';
import { Content, ListItem, Body, Left, Right } from 'native-base';
import { connect } from 'react-redux';

import { podcastSelect, sliderMove } from '../actions/actions';
import { getParsedDuration, getPodcastDetails, getTimeSeek } from '../reducers/selectors';

class Podcast extends Component {
  componentDidMount() {
    this.loaded = false; // Flag for tracking when every podcast has loaded
    const createPlayablePodcast = () => {
      this.podcast = new Sound(this.props.details.url, null, error => { // Load the podcast
        this.loaded = true;
        if(error) {
          throw new Error(error);
        }
      });
    };
    if(this.props.details.url === 'url') { // Check whether the real URL has been passed to the component. If not, add it last in the event loop
      setTimeout(() => {
        createPlayablePodcast();
      });
    } else {
      createPlayablePodcast();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !this.loaded || this.props.details.isPlaying !== nextProps.details.isPlaying;
  }
  componentDidUpdate(prevProps) {
    const { details, parsedDuration, updateSlider } = this.props;
    const { isPlaying } = details;
    if(this.loaded) {
      if(isPlaying) {
        this.podcast.play(() => {
          this.podcast.stop();
          updateSlider(0);
          clearInterval(this.interval);
        });
        this.interval = setInterval(() => { // Update the slider every 500ms
          this.podcast.getCurrentTime(sec => {
            updateSlider(sec / parsedDuration);
          });
          this.podcast.setCurrentTime(this.props.timeSeek * this.props.parsedDuration);
        }, 500);
      } else {
        this.podcast.pause();
        clearInterval(this.interval); // Clear the interval so it doesn't keep on running when the podcast is paused
      }
    }
  }
  componentWillUnmount() {
    if(this.loaded) {
      this.podcast.release(); // Release when it's done so we're not using up resources
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
    const { details, id, onPodcastSelect } = this.props;
    const { duration, link, pubDate, thumbnail, title } = details;
    const date = pubDate.substring(5, 16);
    return (
      <Content>
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
  const mapStateToProps = (state, ownProps) => {
    return {
      details: getDetails(state, ownProps),
      parsedDuration: getDuration(state, ownProps),
      timeSeek: getTimeSeek(state),
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
