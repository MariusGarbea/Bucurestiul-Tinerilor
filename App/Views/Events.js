import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import EventList from '../Components/EventList';

export default class Events extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.events}>
          <EventList />
        </Text>
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