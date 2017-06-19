import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import parseXML from 'react-native-xml2js';

import Podcast from '../Components/Podcast';
import SpinnerHOC from '../Components/SpinnerHOC';

const PodcastWithSpinner = SpinnerHOC(View);

const podcastsEndpoint = 'http://feeds.soundcloud.com/users/soundcloud:users:312765325/sounds.rss';

export default class PodcastList extends Component {
  state = {
    podcastList: [],
  }
  componentDidMount() {
    this.searchForUpdates();
    setInterval(this.searchForUpdates, 600000); // call the API every 10 minutes
  }
  searchForUpdates = () => {
    fetch(podcastsEndpoint)
      .then(response => response.text())
      .then(array => {
        parseXML.parseString(array, (error, result) => {
          if (error) {
            throw new Error(error);
          }
          const data = result.rss.channel[0].item;
          this.setState({ podcastList: data });
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
    const spinner = this.state.podcastList.length === 0;
    const podcasts = this.state.podcastList.map((item, index) => {
      return (
        <Podcast
          key={index}
          title={item.title}
          url={item.enclosure[0].$.url}
        />
      );
    });
    return (
      <PodcastWithSpinner spinner={spinner}>
        { podcasts }
      </PodcastWithSpinner>
    );
  }
}

const styles = StyleSheet.create({

});
