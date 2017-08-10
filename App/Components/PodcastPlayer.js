import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, Slider, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import { playerPauseResumeToggle, sliderMove, timeSeek } from '../actions/podcasts';
import { getCurrentlyPlayingPodcast, getScreenWidth, getProgress, isAnyPodcastPlaying } from '../reducers/selectors';

class PodcastPlayer extends PureComponent {
  playerStyle = width => ({
    playerLayout: {
      flexDirection: 'row',
      paddingLeft: 5,
      paddingRight: 5,
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
    const { activePodcast, onPlayPauseClick, onTimeSeek, podcastPlaying, screenWidth, progress } = this.props;
    const { isPlaying, thumbnail, title } = activePodcast;
    // Fix title to fit in the player
    const displayTitle = `${title.substr(0, 40)}...`; // Temporary solution
    const icon = podcastPlaying
    ? <Icon color="black" name="controller-paus" size={30} />
    : <Icon color="black" name="controller-play" size={30} />;
    return (
      <View style={this.playerStyle(screenWidth).playerLayout}>
        <Image
          resizeMode="center"
          source={{ uri: thumbnail }}
          style={styles.img}
        />
        <View>
          <View style={styles.row}>
            <Text style={styles.marginAlign}>{ displayTitle }</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => onPlayPauseClick(!isPlaying)}>{ icon }</TouchableOpacity>
            <Slider
              onSlidingComplete={value => {
                onPlayPauseClick(true);
                onTimeSeek(value);
              }}
              onValueChange={() => {
                if(isPlaying) {
                  onPlayPauseClick(false);
                }
              }}
              style={this.playerStyle(screenWidth).slider}
              value={progress} // Where the slider is currently at
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activePodcast: getCurrentlyPlayingPodcast(state),
    podcastPlaying: isAnyPodcastPlaying(state),
    screenWidth: getScreenWidth(state),
    progress: getProgress(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlayPauseClick: playing => {
      dispatch(playerPauseResumeToggle(playing));
    },
    onSliderMove: value => {
      dispatch(sliderMove(value));
    },
    onTimeSeek: value => {
      dispatch(timeSeek(value));
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
  onTimeSeek: PropTypes.func.isRequired,
  podcastPlaying: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
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
