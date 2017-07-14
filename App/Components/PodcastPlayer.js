import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Slider, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import { playerPauseResumeToggle, sliderMove } from '../actions/actions';

class PodcastPlayer extends PureComponent {
  state = {
    width: Dimensions.get('window').width,
  }
  onLayout = () => {
    this.setState({
      width: Dimensions.get('window').width,
    });
  }
  playerStyle = (width) => ({
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
    const { activePodcast, onPlayPauseClick, onSliderMove, podcastPlaying } = this.props;
    const { duration, thumbnail, timeSeek, title } = activePodcast;
    const { width } = this.state;
    const parsedDuration = parseDurationString(duration);
    // Fix title to fit in the player
    const displayTitle = `${title.substr(0, 33)}...`; // Temporary solution
    const icon = podcastPlaying
    ? <Icon color="black" name="controller-paus" size={30} />
    : <Icon color="black" name="controller-play" size={30} />;
    return (
      <View
        onLayout={() => this.onLayout()}
        style={this.playerStyle(width).playerLayout}>
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
              style={this.playerStyle(width).slider}
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

const parseDurationString = durationString => ( // Transform podcasts's duration from string to int, in seconds
  parseInt(durationString.substring(0, 2), 10) * 3600
  + parseInt(durationString.substring(3, 5), 10) * 60
  + parseInt(durationString.substring(6, 8), 10)
);

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
    activePodcast: getCurrentlyPlayingPodcast(state),
    podcastPlaying: isAnyPodcastPlaying(state.data),
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
  };
};

PodcastPlayer.propTypes = {
  activePodcast: PropTypes.shape({
    duration: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onPlayPauseClick: PropTypes.func.isRequired,
  onSliderMove: PropTypes.func.isRequired,
  podcastPlaying: PropTypes.bool.isRequired,
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
