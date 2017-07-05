import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import Event from '../Components/Event';
import SpinnerHOC from '../Components/SpinnerHOC';

const accessToken = `EAADbb7hJuS0BAGPNwhGiD3JLXWYUF8oxGNwEc4ZAiB7WRMBOaWXwjRFkTnQIC7HCNIMMzOQB75ZCmVZBL9THwrS7p
                     WvOXaMqBECqFvZAijINas3FfcCnFTgehAQZAbwM7HsJHmE1dujvqCjuaBaMVVYUaZCZBBE7yZCYBZC7XLqAdmQZDZD`;
const eventsEndpoint = `https://graph.facebook.com/bucurestiultinerilor/events?access_token=${accessToken}`;

const EventsWithSpinner = SpinnerHOC(View);

export default class EventsList extends Component {
  state = {
    eventList: [],
  }
  componentDidMount() {
    this.searchForUpdates();
    setInterval(this.searchForUpdates.bind(this), 600000); // call the API every 10 minutes
  }
  async searchForUpdates() {
    try {
      const response = await fetch(eventsEndpoint);
      const responseJSON = await response.json();
      this.setState({ eventList: responseJSON.data });
    } catch(error) {
      Alert.alert(
        'Oops',
        `An error has occurred. Error details: ${error}`,
        [
          {
            text: 'Retry',
            onPress: () => {
              console.log(`Retry Pressed. Error: ${error}`);
              this.searchForUpdates();
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log(`Cancel Pressed. Error: ${error}`),
          },
        ],
        {
          cancelable: false
        }
      );
    }
  }
  render() {
    const spinner = this.state.eventList.length === 0;
    const events = this.state.eventList.map(item => {
      return (
        <Event
          description={item.description}
          endTime={item.end_time}
          id={item.id}
          key={item.id}
          name={item.name}
          place={item.place}
          startTime={item.start_time}
        />
      );
    });
    return (
      <EventsWithSpinner spinner={spinner}>
        { events }
      </EventsWithSpinner>
    );
  }
}

const styles = StyleSheet.create({
});
