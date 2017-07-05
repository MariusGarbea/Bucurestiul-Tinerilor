import React, { PureComponent } from 'react';
import { StyleSheet, Text, Image, Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { Content, ListItem, Body, Left, Right } from 'native-base';

export default class Podcast extends PureComponent {
  state = {
    paused: false,
  }
  openSoundcloudPodcast = (link) => {
    Linking.canOpenURL(link)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${link}`);
        } else {
          return Linking.openURL(link);
        }
      })
      .catch(err => Alert.alert('An error occurred', err));
  }
  render() {
    const { duration, link, pubDate, thumbnail, title, url } = this.props;
    const date = pubDate.substring(5, 16);
    return (
      <Content>
        <Video
          onLoad={() => {
            this.setState({
              paused: true,
            });
          }}
          paused={this.state.paused}
          ref={ref => {
            this.player = ref;
          }}
          source={{ uri: url }}
          style={styles.video}
        />
        <ListItem avatar
         onLongPress={() => {
           Alert.alert(
             'Podcast details',
             `Title: ${title}\n\nPosted on: ${date}\n\nDuration: ${duration}`,
             [
               {
                 text: 'Visit on Soundcloud',
                 onPress: () => {
                   this.openSoundcloudPodcast(link);
                   console.log('Soundcloud visited');
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
           this.setState({ paused: !this.state.paused });
         }}>
          <Left>
            <Image
              resizeMode="center"
              source={{ uri: thumbnail }}
              style={styles.img}
            />
          </Left>
          <Body>
            <Text>{ title }</Text>
            <Text note>{ date }</Text>
          </Body>
          <Right>
            <Text>🕓 { duration }</Text>
          </Right>
        </ListItem>
      </Content>
    );
  }
}

Podcast.propTypes = {
  duration: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: 75,
  },
});
