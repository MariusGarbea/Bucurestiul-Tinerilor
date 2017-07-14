import React, { PureComponent } from 'react';
import { StyleSheet, Text, Image, Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { Content, ListItem, Body, Left, Right } from 'native-base';
import { connect } from 'react-redux';

import { podcastSelect, sliderMove } from '../actions/actions';

class Podcast extends PureComponent {
  componentDidUpdate(prevProps) {
    if(prevProps.details.timeSeek !== this.props.details.timeSeek) { // Check if the slider has moved
      this.player.seek(this.props.details.timeSeek * this.props.parsedDuration); // Navigate to where the user released the slider
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

const parseDurationString = durationString => ( // Transform podcasts's duration from string to int in seconds
  parseInt(durationString.substring(0, 2), 10) * 3600
  + parseInt(durationString.substring(3, 5), 10) * 60
  + parseInt(durationString.substring(6, 8), 10)
);

const mapStateToProps = (state, ownProps) => {
  console.log(state.data);
  return {
    details: state.data[ownProps.id],
    parsedDuration: parseDurationString(state.data[ownProps.id].duration),
  };
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
    timeSeek: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  id: PropTypes.number.isRequired,
  onPodcastSelect: PropTypes.func.isRequired,
  parsedDuration: PropTypes.number.isRequired,
  updateSlider: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: 75,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Podcast);
