import React, { PureComponent } from 'react';
import { StyleSheet, Text, Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Content, ListItem, Body, Left, Right } from 'native-base';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class Event extends PureComponent {
  openFacebookEvent = (url) => { // Open facebook link
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => Alert.alert('An error occurred', err));
  }
  render() {
    const { description, endTime, id, name, place, startTime } = this.props;
    const startDate = startTime.substring(8, 10) + '\n' + months[parseInt(startTime.substring(5, 7), 10)];
    const startHour = startTime.substring(11, 16);
    const endHour = endTime.substring(11, 16);
    const eventURL = `https://www.facebook.com/events/${id}`;
    return (
        <Content>
          <ListItem avatar
           onLongPress={() => {
             Alert.alert(
               'Event details',
               `Name: ${name}\n\nLocation: ${place.name}, ${place.location.city}\n\nTime: ${startHour} - ${endHour}\n\nDescription: ${description}`,
               [
                 {
                   text: 'Visit on Facebook',
                   onPress: () => {
                     this.openFacebookEvent(eventURL);
                     console.log('Facebook visited');
                   },
                 },
                 {
                   text: 'Dismiss',
                   onPress: () => {
                     console.log('Dismissed');
                   },
                 },
               ],
             );
           }}
           onPress={() => {
             this.openFacebookEvent(eventURL);
           }}>
            <Left>
              <Text>{ startDate }</Text>
            </Left>
            <Body>
              <Text>{ name }</Text>
              <Text note>{ place.name }</Text>
            </Body>
            <Right>
              <Text note>🕓 { startHour }</Text>
            </Right>
          </ListItem>
        </Content>
    );
  }
}

Event.defaultProps = {
  place: {
    name: 'Unknown place',
    location: {
      city: 'Unknown city',
      country: '',
      latitude: NaN,
      longitude: NaN,
      street: '',
    },
    id: '',
  },
};

Event.propTypes = {
  description: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      street: PropTypes.string,
    }),
    id: PropTypes.string,
  }),
  startTime: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({

});
