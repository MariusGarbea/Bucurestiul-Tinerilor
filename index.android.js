/*
TODO:
  -Push Notifications for all 3 pages when app is in background
  -Add Google Analytics - UA-93545315-1
  -Add Ads
*/

import React from 'react';
import { AppRegistry, Share, TouchableOpacity, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
import { Provider } from 'react-redux';

import EventsList from './App/Views/EventsList';
import NewsList from './App/Views/NewsList';
import PodcastsList from './App/Views/PodcastsList';
import About from './App/Views/About';
import SpecificArticle from './App/Views/SpecificArticle';
import store from './App/store/configureStore';

const tracker = new GoogleAnalyticsTracker('UA-93545315-1');

GoogleAnalyticsSettings.setDryRun(true);
tracker.trackScreenView('Home');

// Push Notification Configuration
PushNotification.configure({
  // Called when a notification is opened
  onNotification(notification) {
    console.log('NOTIFICATION:', notification); // Navigate to the specific route
  },
});

// Routing
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
          activeOpacity={0.5}
          onPress={() => {
            Share.share({
              message: `${navigation.state.params.link}\n${navigation.state.params.title}\nby ${navigation.state.params.author}`,
            });
          }}
          style={styles.marginAlign}
          >
          <Icon
            color="black"
            name="share"
            size={30}
          />
        </TouchableOpacity>,
      headerTintColor: 'black',
    }),
  },
});

const BucurestiulTinerilor = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  marginAlign: {
    marginRight: 15,
  },
});

AppRegistry.registerComponent('BucurestiulTinerilor', () => BucurestiulTinerilor);
