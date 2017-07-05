import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Slider } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';

export default class PodcastPlayer extends PureComponent {
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
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 75,
      width: width,
      backgroundColor: 'pink'
    },
    slider: {
      width: width-125
    }
  })
  render() {
    const { duration, thumbnail, title } = this.props;
    const { width } = this.state;
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
              style={this.playerStyle(width).slider}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
