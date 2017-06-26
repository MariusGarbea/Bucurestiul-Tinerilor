/*
TODO:
  -Push Notifications for all 3 pages
  -Add Google Analytics - UA-93545315-1
  -Add new About page
  -Add Redux support
*/

import React from 'react';
import { AppRegistry, Button, Share, TouchableOpacity } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

import EventsList from './App/Views/EventsList';
import NewsList from './App/Views/NewsList';
import PodcastsList from './App/Views/PodcastsList';
import About from './App/Views/About';
import SpecificArticle from './App/Views/SpecificArticle';

const Home = TabNavigator({
  News: { screen: NewsList },
  Events: { screen: EventsList },
  Podcast: { screen: PodcastsList },
  About: { screen: About },
});

const App = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  SpecificArticle: {
    screen: SpecificArticle,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerRight:
        <TouchableOpacity
          onPress={() => {
            Share.share({
              message: `${navigation.state.params.link}\n${navigation.state.params.title}\nby ${navigation.state.params.author}`,
            })
            .then(console.log('Shared article'));
          }}
          style={{ marginRight: 15 }}
          >
          <Icon
            name="share"
            size={30}
            color="black"
          />
        </TouchableOpacity>,
      headerTintColor: 'black',
    }),
  },
});

const BucurestiulTinerilor = () => {
  return (
    <App />
  );
};

AppRegistry.registerComponent('BucurestiulTinerilor', () => BucurestiulTinerilor);
