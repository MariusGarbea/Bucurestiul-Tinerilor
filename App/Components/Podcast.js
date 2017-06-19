import React, { PureComponent } from 'react';
import { StyleSheet, View, NativeModules, DeviceEventEmitter, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const { ReactNativeAudioStreaming } = NativeModules;

const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING';
const BUFFERING_START = 'BUFFERING_START';

export default class Podcast extends PureComponent {
  state = {
    status: STOPPED,
    song: '',
  }
  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('AudioBridgeEvent', evt => {
      if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
        this.setState({ song: evt.value });
      } else if (evt.status !== METADATA_UPDATED) {
        this.setState(evt);
      }
    });
    ReactNativeAudioStreaming.getStatus((error, status) => {
      (error) ? console.log(error) : this.setState(status);
    });
  }
  _onPress = () => {
    const { url } = this.props;
    switch (this.state.status) {
    case PLAYING:
    case STREAMING:
      ReactNativeAudioStreaming.pause();
      break;
    case PAUSED:
      ReactNativeAudioStreaming.resume();
      break;
    case STOPPED:
    case ERROR:
      ReactNativeAudioStreaming.play(url, { showInAndroidNotifications: true });
      break;
    case BUFFERING:
      ReactNativeAudioStreaming.stop();
      break;
    }
  }

  render() {
    const { title } = this.props;
    let icon = null;
    switch (this.state.status) {
    case PLAYING:
    case STREAMING:
      icon = <Text>॥</Text>;
      break;
    case PAUSED:
    case STOPPED:
    case ERROR:
      icon = <Text>▸</Text>;
      break;
    case BUFFERING:
    case BUFFERING_START:
    case START_PREPARING:
      icon = <ActivityIndicator color="red" size="large" />;
      break;
    }
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          { icon }
          <Text>{ title }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Podcast.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({

});
