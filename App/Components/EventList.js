import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const access_token = "EAADbb7hJuS0BAGPNwhGiD3JLXWYUF8oxGNwEc4ZAiB7WRMBOaWXwjRFkTnQIC7HCNIMMzOQB75ZCmVZBL9THwrS7pWvOXaMqBECqFvZAijINas3FfcCnFTgehAQZAbwM7HsJHmE1dujvqCjuaBaMVVYUaZCZBBE7yZCYBZC7XLqAdmQZDZD";
const eventsEndpoint = `https://graph.facebook.com/bucurestiultinerilor/events?access_token=${access_token}`;

export default class Events extends Component {
  constructor() {
    super();
    this.state = {
      eventList: []
    }
  }
  componentDidMount() {
    fetch(eventsEndpoint)
      .then(response => response.json())
      .then(array => {
        this.setState({eventList: array.data})
      })
      .catch(error => console.log(error));
  }
  render() {
    let descriptionList = this.state.eventList.map(item => item.description);
    return (
      <Text>
        {descriptionList}
      </Text>
    );
  }
}

const styles = StyleSheet.create({

});