import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class EventList extends PureComponent {
  render() {
    const { description, endTime, name, place, startTime } = this.props;
    return (
      <Text>
        <Text>{description}</Text>
        <Text>{endTime}</Text>
        <Text>{name}</Text>
        <Text>{place.name}</Text>
        <Text>{startTime}</Text>
      </Text>
    );
  }
}

EventList.propTypes = {
  description: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
  }),
  startTime: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({

});
