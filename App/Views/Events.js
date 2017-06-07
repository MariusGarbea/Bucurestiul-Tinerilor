import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const access_token = "EAADbb7hJuS0BAGPNwhGiD3JLXWYUF8oxGNwEc4ZAiB7WRMBOaWXwjRFkTnQIC7HCNIMMzOQB75ZCmVZBL9THwrS7pWvOXaMqBECqFvZAijINas3FfcCnFTgehAQZAbwM7HsJHmE1dujvqCjuaBaMVVYUaZCZBBE7yZCYBZC7XLqAdmQZDZD";
const eventsEndpoint = `https://graph.facebook.com/bucurestiultinerilor/events?access_token=${access_token}`;

export default class Events extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Fetch a list of events from Facebook's API and then display them if clicked in a new Scene
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});