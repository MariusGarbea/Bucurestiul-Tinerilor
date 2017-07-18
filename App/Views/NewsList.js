// Consider using WebView for displaying articles; advantages: can render the iframes

import React, { Component } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import parseXML from 'react-native-xml2js';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';

import { screenWidthChange } from '../actions/actions';
import { getScreenWidth } from '../reducers/selectors';

import News from '../Components/News';
import SpinnerHOC from '../Components/SpinnerHOC';

const newsEndpoint = 'http://bucurestiultinerilor.info/feed/';

const NewsWithSpinner = SpinnerHOC(View);

class NewsList extends Component {
  state = {
    newsList: [],
  }
  componentDidMount() {
    this.searchForUpdates();
  }
  async searchForUpdates() {
    try {
      const response = await fetch(newsEndpoint);
      const responseTXT = await response.text();
      parseXML.parseString(responseTXT, (error, result) => {
        if (error) {
          throw new Error(error);
        }
        const data = result.rss.channel[0].item;
        this.setState({ newsList: data });
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
            onPress: () => console.log(`Error fetching data - Cancel Pressed. Error: ${error}`),
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  }
  render() {
    const { onLayoutChange, screenWidth } = this.props;
    const spinner = this.state.newsList.length === 0;
    const news = this.state.newsList.map((item, index) => {
      return (
        <News
          author={item['dc:creator'][0]}
          content={item['content:encoded'][0]}
          key={index}
          link={item.link[0]}
          navigation={this.props.navigation}
          pubDate={item.pubDate[0]}
          screenWidth={screenWidth}
          title={item.title[0]}
        />
      );
    });
    return (
      <NewsWithSpinner
        onLayout={() => onLayoutChange(Dimensions.get('window').width)}
        spinner={spinner}
      >
        { news }
      </NewsWithSpinner>
    );
  }
}

const mapStateToProps = state => {
  return {
    screenWidth: getScreenWidth(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLayoutChange: value => {
      dispatch(screenWidthChange(value));
    },
  };
};

NewsList.propTypes = {
  navigation: PropTypes.object.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  screenWidth: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
