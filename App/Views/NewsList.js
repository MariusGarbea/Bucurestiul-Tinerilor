import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import parseXML from 'react-native-xml2js';

import SpinnerHOC from '../Components/SpinnerHOC';
import News from '../Components/News';

const NewsWithSpinner = SpinnerHOC(View);

export default class NewsList extends Component {
  state = {
    newsList: [],
  }
  componentDidMount() {
    this.searchForUpdates();
    setInterval(this.searchForUpdates, 600000); // call the API every 10 minutes
  }
  searchForUpdates = () => {
    fetch('http://bucurestiultinerilor.info/feed/')
      .then(response => response.text())
      .then(array => {
        parseXML.parseString(array, (error, result) => {
          if (error) {
            throw new Error(error);
          }
          const data = result.rss.channel[0].item;
          this.setState({ newsList: data });
          // PREMATURE OPTIMIZATION - NO NEED FOR NOW AND POSSIBLY FOREVER
          // if (this.state.newsList.length === 0) { // check if this is the first request
          //   this.setState({ newsList: data });
          // } else if (data[0].pubDate[0] !== this.state.newsList[0].pubDate[0]) {
          //   // if it is not the first request, compare if new events were added before changing the state
          //   const newEvents = [];
          //   const arrayLength = data.length;
          //   for (let i = 0; i < arrayLength && data[i].pubDate[0] !== this.state.newsList[i].pubDate[0]; i++) {
          //     newEvents.push(data[i]); // push every new event
          //   }
          //   this.setState({ newsList: [...newEvents, ...this.state.newsList] });
          //   // if new events were added, spread them to the existing state
          // }
        });
      })
      .catch((error) => {
        Alert.alert(
          'Oops',
          `An error has occurred. Error details: ${error}`,
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
    const spinner = this.state.newsList.length === 0;
    const news = this.state.newsList.map((item, index) => {
      return (
        <News
          author={item['dc:creator'][0]}
          content={item['content:encoded'][0]}
          key={index}
          link={item.link[0]}
          navigation={this.props.navigation}
          pubDate={item.pubDate[0]}
          title={item.title[0]}
        />
      );
    });
    return (
      <NewsWithSpinner spinner={spinner}>
        { news }
      </NewsWithSpinner>
    );
  }
}

NewsList.PropTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({

});
