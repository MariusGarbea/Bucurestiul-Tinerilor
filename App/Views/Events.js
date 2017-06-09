import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Alert
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
    this.searchForUpdates = this.searchForUpdates.bind(this);
  }
  searchForUpdates() {
    fetch(eventsEndpoint)
      .then(response => response.json())
      .then(array => {
        if(this.state.eventList.length === 0) { //check if this is the first request
          this.setState({eventList: array.data});
        } else { //if it is not the first request, compare if new events were added before changing the state
          if(array.data[0].id !== this.state.eventList[0].id) {
            let i = 0;
            let newEvents = [];
            while(array.data[i].id !== this.state.eventList[i].id) {
              newEvents.push(array.data[i]);
              i++;
            }
            this.setState({eventList: [...newEvents, ...this.state.eventList]}) //if new events were added, concat them to the existing state
          }
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert(
          'Oops',
          `An error has occurred while fetching events. Error details: ${error}`,
          [
            {text: 'Retry', onPress: () => {
              console.log(`Error fetching data - Retry Pressed. Error: ${error}`);
              this.searchForUpdates();
            }
            },
            {text: 'Cancel', onPress: () => console.log(`Error fetching data - Cancel Pressed. Error: ${error}`)},
          ],
          { cancelable: false }
        )
      });
  }
  componentDidMount() {
    this.searchForUpdates();
    setInterval(this.searchForUpdates, 60000); //call the API every minute
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