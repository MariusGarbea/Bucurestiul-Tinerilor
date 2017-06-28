import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Slider } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';

export default class PodcastPlayer extends PureComponent {
  render() {
    const { duration, thumbnail, title } = this.props;
    return (
      <View style={styles.player}>
        <Image
          resizeMode="center"
          source={{ uri: thumbnail }}
          style={styles.img}
        />
        <View>
          <View style={styles.row}>
            <Text>{ title }</Text>
            <Text>{ duration }</Text>
          </View>
          <View style={styles.row}>
            <Icon
              name="controller-play"
              size={30}
              color="black"
            />
            <Slider
              style={styles.slider}
            />
          </View>
        </View>
      </View>
    );
  }
}

PodcastPlayer.propTypes = {
  duration: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const $tabBlue = '#2196F3';

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: 75,
  },
  player: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    width: Dimensions.get('window').width,
    backgroundColor: 'pink',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    width: 230,
  },
});
