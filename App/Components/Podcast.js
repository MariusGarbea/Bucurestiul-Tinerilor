import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';

export default class Podcast extends PureComponent {
  state = {
    paused: false,
  }
  render() {
    const { duration, thumbnail, title, url } = this.props;
    return (
      <ScrollView>
        <Text>{title}</Text>
        <Text>{duration}</Text>
        <Image
          resizeMode="center"
          source={{ uri: thumbnail }}
          style={styles.img}
        />
        <Video
          onLoad={() => {
            this.setState({
              paused: true,
            });
          }}
          paused={this.state.paused}
          ref={ref => {
            this.player = ref;
          }}
          source={{ uri: url }}
          style={styles.video}
        />
      </ScrollView>
    );
  }
}

Podcast.propTypes = {
  duration: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
  },
});
