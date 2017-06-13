import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Content, ListItem, Body, Left, Right } from 'native-base';

const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class EventList extends PureComponent {
  render() {
    const { name, place, startTime } = this.props;
    const startDate = startTime.substring(8, 10) + '\n' + months[parseInt(startTime.substring(5, 7), 10)];
    const startHour = startTime.substring(11, 16);
    return (
      <Content>
        <ListItem avatar>
          <Left>
            <Text>{ startDate }</Text>
          </Left>
          <Body>
            <Text>{ name }</Text>
            <Text note>{ place.name }</Text>
          </Body>
          <Right>
            <Text note>{ startHour }</Text>
          </Right>
        </ListItem>
      </Content>
    );
  }
}

EventList.propTypes = {
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
