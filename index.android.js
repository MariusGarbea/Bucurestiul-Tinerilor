/*
TODO:
  -Manage routing for News page - use lastBuildDate for updating state
  -Push Notifications for all 3 pages
  -Open Events in Facebook app
  -Manage Podcast format and get the stream going
  -Add share button
  -Add Google Analytics - UA-93545315-1
*/

import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import {
  TabNavigator,
} from 'react-navigation';

import Events from './App/Views/Events';
import News from './App/Views/News';
import Podcasts from './App/Views/Podcasts';

const Tabs = TabNavigator({
  News: { screen: News },
  Events: { screen: Events },
  Podcasts: { screen: Podcasts },
});

const BucurestiulTinerilor = () => {
  return (
    <Tabs />
  );
};

AppRegistry.registerComponent('BucurestiulTinerilor', () => BucurestiulTinerilor);
