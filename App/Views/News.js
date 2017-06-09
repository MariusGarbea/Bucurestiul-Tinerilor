import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
var parseString = require('react-native-xml2js').parseString;

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      newsList: []
    }
    this.searchForUpdates = this.searchForUpdates.bind(this);
  }
  searchForUpdates() {
    fetch('http://bucurestiultinerilor.info/feed/')
      .then(response => response.text())
      .then(array => {
        parseString(array, (error, result) => {
          if(error) {
            throw new Error(error);
          }
          console.log(result.rss.channel[0].item[0].category[0]);
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  componentDidMount() {
    this.searchForUpdates();
  }
  render() {
    return (
      <ScrollView>
        <Text>Yes</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
