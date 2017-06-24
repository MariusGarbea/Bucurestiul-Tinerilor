import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Slider } from 'react-native';
import PropTypes from 'prop-types';

const PodcastPlayer = ({ duration, thumbnail, title }) => {
  return (
    <View style={styles.player}>
      <Image
        resizeMode="center"
        source={{ uri: thumbnail }}
        style={styles.img}
      />
      <View style={{}}>
        <View style={styles.row}>
          <Text>{ title }</Text>
          <Text>{ duration }</Text>
        </View>
        <View style={styles.row}>
          <Text>▐▐</Text>
          <Slider
            style={styles.slider}
          />
        </View>
      </View>
    </View>
  );
};

PodcastPlayer.propTypes = {
  duration: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: 75,
  },
  player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    width: 250,
  },
});

export default PodcastPlayer;
