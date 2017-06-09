/*
TODO: 
  -Manage routing for News page
  -Push Notifications for all 3 pages
  -Open Events in Facebook app
  -Manage Podcast format and get the stream going
  -Add share button
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  Text
} from 'react-native';
import {
  TabNavigator
} from 'react-navigation';

import Events from './App/Views/Events';
import News from './App/Views/News';
import Podcasts from './App/Views/Podcasts';

const Tabs = TabNavigator({
  News: {screen: News},
  Events: {screen: Events},
  Podcasts: {screen: Podcasts}
});

const rnapp = () => {
  return (
    <Tabs />
  );
}

AppRegistry.registerComponent('rnapp', () => rnapp);
