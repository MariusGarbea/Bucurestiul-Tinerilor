import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import EventList from '../Components/EventList';

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
    let events = this.state.eventList.map(item => {
      return (
        <EventList 
          key = {item.id}
          description = {item.description} 
          end_time = {item.end_time} 
          name = {item.name}
          place = {item.place} 
          start_time = {item.start_time} 
        />
      )
    });
    return (
      <ScrollView>
        <Text>{events}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  events: {
    fontSize: 20,
    margin: 10,
  },
});