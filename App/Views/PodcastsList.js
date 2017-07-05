import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text, Dimensions, Image, Slider } from 'react-native';
import parseXML from 'react-native-xml2js';
import { Container } from 'native-base';

import Podcast from '../Components/Podcast';
import PodcastPlayer from '../Components/PodcastPlayer';
import SpinnerHOC from '../Components/SpinnerHOC';

const PodcastWithSpinner = SpinnerHOC(View);

const podcastsEndpoint = 'http://feeds.soundcloud.com/users/soundcloud:users:312765325/sounds.rss';

export default class PodcastList extends Component {
  state = {
    podcastList: [],
  }
  componentDidMount() {
    this.searchForUpdates();
    setInterval(this.searchForUpdates.bind(this), 600000); // call the API every 10 minutes
  }
  async searchForUpdates() {
    try {
      const response = await fetch(podcastsEndpoint);
      const responseTXT = await response.text();
      parseXML.parseString(responseTXT, (error, result) => {
        if (error) {
          throw new Error(error);
        }
        const data = result.rss.channel[0].item;
        this.setState({ podcastList: data });
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
    const spinner = this.state.podcastList.length === 0;
    const podcasts = this.state.podcastList.map((item, index) => {
      return (
        <Podcast
          duration={item['itunes:duration'][0]}
          key={index}
          link={item.link[0]}
          pubDate={item.pubDate[0]}
          thumbnail={item['itunes:image'][0].$.href}
          title={item.title[0]}
          url={item.enclosure[0].$.url}
        />
      );
    });
    return (
      <Container>
        <PodcastWithSpinner spinner={spinner}>
          { podcasts }
        </PodcastWithSpinner>
        <PodcastPlayer
          duration="01:23:45"
          thumbnail="http://i1.sndcdn.com/artworks-000229176688-7utubg-original.jpg"
          title="Bucurestiul Tinerilor"
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});
