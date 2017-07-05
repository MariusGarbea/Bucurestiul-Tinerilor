// Consider using WebView for displaying articles; advantages: can render the iframes

import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import parseXML from 'react-native-xml2js';
import PushNotification from 'react-native-push-notification';

import News from '../Components/News';
import SpinnerHOC from '../Components/SpinnerHOC';

const newsEndpoint = 'http://bucurestiultinerilor.info/feed/';

const NewsWithSpinner = SpinnerHOC(View);

export default class NewsList extends Component {
  state = {
    newsList: [],
  }
  componentDidMount() {
    this.searchForUpdates();
    setInterval(this.searchForUpdates.bind(this), 600000); // call the API every 10 minutes
  }
  async searchForUpdates() {
    try {
      const response = await fetch(newsEndpoint);
      const responseTXT = await response.text();
      parseXML.parseString(responseTXT, (error, result) => {
        if (error) {
          throw new Error(error);
        }
        const data = result.rss.channel[0].item;
        console.log(this.state.newsList);
        this.setState({ newsList: data });
      });
    } catch(error) {
      Alert.alert(
        'Oops',
        `An error has occurred. Error details: ${error}`,
        [
          {
            text: 'Retry',
            onPress: () => {
              console.log(`Error fetching data - Retry Pressed. Error: ${error}`);
              this.searchForUpdates();
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log(`Error fetching data - Cancel Pressed. Error: ${error}`)
          },
        ],
        {
          cancelable: false
        }
      );
    }
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

NewsList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({

});
