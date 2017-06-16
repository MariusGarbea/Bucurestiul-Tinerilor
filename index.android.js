/*
TODO:
  -Manage routing for News and Events pages
  -Push Notifications for all 3 pages
  -Open Events in Facebook app
  -Manage Podcast format and get the stream going
  -Add share button
  -Add Google Analytics - UA-93545315-1
*/

import React from 'react';
import { AppRegistry } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import EventsList from './App/Views/EventsList';
import NewsList from './App/Views/NewsList';
import SpecificArticle from './App/Views/SpecificArticle';
import Podcasts from './App/Views/Podcasts';

const Home = TabNavigator({
  News: { screen: NewsList },
  Events: { screen: EventsList },
  Podcasts: { screen: Podcasts },
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
    navigationOptions: {
      title: 'Home',
    },
  },
});

const BucurestiulTinerilor = () => {
  return (
    <App />
  );
};

AppRegistry.registerComponent('BucurestiulTinerilor', () => BucurestiulTinerilor);
