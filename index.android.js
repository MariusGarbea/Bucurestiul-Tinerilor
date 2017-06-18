/*
TODO:
  -Push Notifications for all 3 pages
  -Add Google Analytics - UA-93545315-1
*/

import React from 'react';
import { AppRegistry, Button, Share } from 'react-native';
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
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerRight:
        <Button
         onPress={() => {
           Share.share({
             message: `${navigation.state.params.link}\n${navigation.state.params.title}\nby ${navigation.state.params.author}`,
           })
           .then(console.log('Shared article'));
         }}
         title="Share"/>,
      headerTintColor: 'pink',
    }),
  },
});

const BucurestiulTinerilor = () => {
  return (
    <App />
  );
};

AppRegistry.registerComponent('BucurestiulTinerilor', () => BucurestiulTinerilor);
