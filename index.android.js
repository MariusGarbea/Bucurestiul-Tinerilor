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
import { Router, Scene } from 'react-native-router-flux'; 

import Events from './App/Views/Events';
import News from './App/Views/News';
import Podcasts from './App/Views/Podcasts';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? "red" : "black"}}>{title}</Text>
  );
}

const BucTin = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="tabbar" tabs tabBarStyle={{ backgroundColor: "#FFF" }}>
          <Scene key="NewsTab" title="News" icon={TabIcon} >
            <Scene key="News" component={News} title="News" >

            </Scene>
          </Scene>
          <Scene key="EventsTab" title="Events" icon={TabIcon} >
            <Scene key="Events" component={Events} title="Events" >

            </Scene>
          </Scene>
          <Scene key="PodcastsTab" title="Podcasts" icon={TabIcon} >
            <Scene key="Podcasts" component={Podcasts} title="Podcasts" >

            </Scene>
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

AppRegistry.registerComponent('BucTin', () => BucTin);
