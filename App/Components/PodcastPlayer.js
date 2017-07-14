import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Slider, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import { playerPauseResumeToggle, screenWidthChange, sliderMove } from '../actions/actions';
import { parseDurationString } from '../reducers/reducer';

class PodcastPlayer extends PureComponent {
  playerStyle = width => ({
    playerLayout: {
      flexDirection: 'row',
      paddingLeft: 5,
      paddingRight: 5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 75,
      width,
      backgroundColor: 'pink',
    },
    slider: {
      width: width - 100,
    },
  })
  render() {
    const { activePodcast, onLayoutChange, onPlayPauseClick, onSliderMove, podcastPlaying, screenWidth } = this.props;
    const { duration, thumbnail, timeSeek, title } = activePodcast;
    const parsedDuration = parseDurationString(duration);
    // Fix title to fit in the player
    const displayTitle = `${title.substr(0, 33)}...`; // Temporary solution
    const icon = podcastPlaying
    ? <Icon color="black" name="controller-paus" size={30} />
    : <Icon color="black" name="controller-play" size={30} />;
    return (
      <View
        onLayout={() => onLayoutChange(Dimensions.get('window').width)}
        style={this.playerStyle(screenWidth).playerLayout}>
        <Image
          resizeMode="center"
          source={{ uri: thumbnail }}
          style={styles.img}
        />
        <View>
          <View style={styles.row}>
            <Text style={styles.marginAlign}>{ displayTitle }</Text>
            <Text>{ parseDurationInt(parseInt(timeSeek * parsedDuration, 10)) }</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => onPlayPauseClick()}>{ icon }</TouchableOpacity>
            <Slider
              onSlidingComplete={value => onSliderMove(value)}
              style={this.playerStyle(screenWidth).slider}
              value={timeSeek} // The value of the slider - used to remember where the user paused a podcast
            />
          </View>
        </View>
      </View>
    );
  }
}

const pad = (str, padString, length) => {
  while (str.length < length) {
    str = padString + str;
  }
  return str;
};

const parseDurationInt = seconds => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours.toString(), '0', 2)}:${pad(minutes.toString(), '0', 2)}:${pad(seconds.toString(), '0', 2)}`;
};

const getCurrentlyPlayingPodcast = podcasts => {
  return podcasts.data.filter(podcast => podcast.id === podcasts.podcastCurrentlyOn)[0];
};

const isAnyPodcastPlaying = podcasts => { // Check whether every podcast is paused
  let playing = false;
  podcasts.map(podcast => {
    if(podcast.isPlaying) {
      playing = true;
    }
  });
  return playing;
};

const mapStateToProps = state => {
  return {
    activePodcast: getCurrentlyPlayingPodcast(state.podcastReducer),
    podcastPlaying: isAnyPodcastPlaying(state.podcastReducer.data),
    screenWidth: state.screenReducer.screenWidth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlayPauseClick: () => {
      dispatch(playerPauseResumeToggle());
    },
    onSliderMove: value => {
      dispatch(sliderMove(value));
    },
    onLayoutChange: value => {
      dispatch(screenWidthChange(value));
    },
  };
};

PodcastPlayer.propTypes = {
  activePodcast: PropTypes.shape({
    duration: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onLayoutChange: PropTypes.func.isRequired,
  onPlayPauseClick: PropTypes.func.isRequired,
  onSliderMove: PropTypes.func.isRequired,
  podcastPlaying: PropTypes.bool.isRequired,
  screenWidth: PropTypes.number.isRequired,
};

const $tabBlue = '#2196F3';

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
  },
  marginAlign: {
    marginRight: 10,
    marginLeft: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PodcastPlayer);
