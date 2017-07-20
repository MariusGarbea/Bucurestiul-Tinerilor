import React, { PureComponent } from 'react';
import { StyleSheet, Text, Image, Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Sound from 'react-native-sound';
import { Content, ListItem, Body, Left, Right } from 'native-base';
import { connect } from 'react-redux';

import { podcastSelect, sliderMove } from '../actions/actions';
import { getParsedDuration, getPodcastDetails, getTimeSeek } from '../reducers/selectors';

class Podcast extends PureComponent {
  componentDidMount() {
    this.podcast = new Sound(this.props.details.url, undefined, error => {
      console.log('loaded');
      if(error) {
        console.log(error)
      }
    });
  }
  componentDidUpdate(prevProps) {
    const { details, id, onPodcastSelect, parsedDuration, timeSeek, updateSlider } = this.props;
    const { duration, isPlaying, link, pubDate, thumbnail, title, url } = details;
    
      if(isPlaying) {
        this.podcast.play(() => {
          // Release when it's done so we're not using up resources
          this.podcast.release();
        });
      } else {
        this.podcast.pause();
        this.podcast.setCurrentTime(timeSeek);
      }
  }
  componentWillUnmount() {
    // release sound
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
    const { details, id, onPodcastSelect, parsedDuration, timeSeek, updateSlider } = this.props;
    const { duration, isPlaying, link, pubDate, thumbnail, title, url } = details;
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
