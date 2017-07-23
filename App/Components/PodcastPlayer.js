import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, Slider, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import { playerPauseResumeToggle, sliderMove } from '../actions/actions';
import { getCurrentlyPlayingPodcast, getScreenWidth, getTimeSeek, isAnyPodcastPlaying } from '../reducers/selectors';

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
    const { activePodcast, onPlayPauseClick, onSliderMove, podcastPlaying, screenWidth, timeSeek } = this.props;
    const { thumbnail, title } = activePodcast;
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
            <TouchableOpacity onPress={() => onPlayPauseClick()}>{ icon }</TouchableOpacity>
            <Slider
              onSlidingComplete={value => onSliderMove(value)}
              style={this.playerStyle(screenWidth).slider}
              value={timeSeek} // Where the slider is currently at
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
    timeSeek: getTimeSeek(state),
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
  screenWidth: PropTypes.number.isRequired,
  timeSeek: PropTypes.number.isRequired,
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
