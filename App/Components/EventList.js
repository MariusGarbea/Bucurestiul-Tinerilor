import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class EventList extends PureComponent {
  render() {
    let { description, end_time, name, place, start_time } = this.props;
    return (
      <Text>{end_time}</Text>
    )
  }
}

EventList.propTypes = {
  description: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      street: PropTypes.string
    }),
    id: PropTypes.string
  }),
  start_time: PropTypes.string.isRequired
}

const styles = StyleSheet.create({

});