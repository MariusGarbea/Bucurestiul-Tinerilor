import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import EventList from '../Components/EventList';

const accessToken = `EAADbb7hJuS0BAGPNwhGiD3JLXWYUF8oxGNwEc4ZAiB7WRMBOaWXwjRFkTnQIC7HCNIMMzOQB75ZCmVZBL9THwrS7p
                     WvOXaMqBECqFvZAijINas3FfcCnFTgehAQZAbwM7HsJHmE1dujvqCjuaBaMVVYUaZCZBBE7yZCYBZC7XLqAdmQZDZD`;
const eventsEndpoint = `https://graph.facebook.com/bucurestiultinerilor/events?access_token=${accessToken}`;

export default class Events extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
    };
    this.searchForUpdates = this.searchForUpdates.bind(this);
  }
  componentDidMount() {
    this.searchForUpdates();
    setInterval(this.searchForUpdates, 60000); // call the API every minute
  }
  searchForUpdates() {
    fetch(eventsEndpoint)
      .then(response => response.json())
      .then(array => {
        if (this.state.eventList.length === 0) { // check if this is the first request
          this.setState({ eventList: array.data });
        } else if (array.data[0].id !== this.state.eventList[0].id) {
        // if it is not the first request, compare if new events were added before changing the state
          const newEvents = [];
          const arrayLength = array.data.length;
          for (let i = 0; i < arrayLength && array.data[i].id !== this.state.eventList[i].id; i++) {
            newEvents.push(array.data[i]); // push every new event
          }
          this.setState({ eventList: [...newEvents, ...this.state.eventList] });
          // if new events were added, spread them to the existing state
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert(
          'Oops',
          `An error has occurred while fetching events. Error details: ${error}`,
          [
            { text: 'Retry', onPress: () => {
              console.log(`Error fetching data - Retry Pressed. Error: ${error}`);
              this.searchForUpdates();
            },
            },
            { text: 'Cancel', onPress: () => console.log(`Error fetching data - Cancel Pressed. Error: ${error}`) },
          ],
          { cancelable: false }
        );
      });
  }
  render() {
    const events = this.state.eventList.map(item => {
      return (
        <EventList
          key = {item.id}
          name = {item.name}
          place = {item.place}
          startTime = {item.start_time}
        />
      );
    });
    return (
      <ScrollView>
        {events}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
});
