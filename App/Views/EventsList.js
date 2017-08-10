import React, { Component } from 'react';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AdMobBanner } from 'react-native-admob';

import Event from '../Components/Event';
import SpinnerHOC from '../Components/SpinnerHOC';
import { eventItemsFetchData } from '../actions/events';
import { getError, getFetchData, getLoadingStatus } from '../reducers/selectors';

const accessToken = `EAADbb7hJuS0BAGPNwhGiD3JLXWYUF8oxGNwEc4ZAiB7WRMBOaWXwjRFkTnQIC7HCNIMMzOQB75ZCmVZBL9THwrS7p
WvOXaMqBECqFvZAijINas3FfcCnFTgehAQZAbwM7HsJHmE1dujvqCjuaBaMVVYUaZCZBBE7yZCYBZC7XLqAdmQZDZD`;
const eventsEndpoint = `https://graph.facebook.com/bucurestiultinerilor/events?access_token=${accessToken}`;

const EventsWithSpinner = SpinnerHOC(View);

class EventsList extends Component {
  componentDidMount() {
    const { fetchEventData } = this.props;
    fetchEventData(eventsEndpoint);
  }
  fetchHasErrored = () => (
    Alert.alert(
      'Oops',
      `An error has occurred. Error details: ${this.props.error}`,
      [
        {
          text: 'Retry',
          onPress: () => {
            this.props.fetchEventData(eventsEndpoint);
          },
        },
        {
          text: 'Cancel',
        },
      ],
      {
        cancelable: false,
      }
    )
  )
  render() {
    const { data, error, isLoading } = this.props;
    const events = data.map(item => {
      return (
        <Event
          description={item.description}
          endTime={item.endTime}
          id={item.id}
          key={item.id}
          name={item.name}
          place={item.place}
          startTime={item.startTime}
        />
      );
    });
    if(error) {
      return this.fetchHasErrored();
    }
    return (
      <ScrollView>
        <AdMobBanner adUnitID="ca-app-pub-3940256099942544/6300978111" />
        <EventsWithSpinner spinner={isLoading}>
          { events }
        </EventsWithSpinner>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: getFetchData(state.eventReducer),
    error: getError(state.eventReducer),
    isLoading: getLoadingStatus(state.eventReducer),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventData: url => dispatch(eventItemsFetchData(url)),
  };
};

EventsList.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  fetchEventData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
