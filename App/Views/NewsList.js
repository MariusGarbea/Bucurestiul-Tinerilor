// Consider using WebView for displaying articles; advantages: can render the iframes

import React, { Component } from 'react';
import { StyleSheet, View, Alert, Dimensions, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { AdMobBanner } from 'react-native-admob';

import News from '../Components/News';
import SpinnerHOC from '../Components/SpinnerHOC';
import { newsItemsFetchData } from '../actions/news';
import { screenWidthChange } from '../actions/screen';
import { getError, getFetchData, getLoadingStatus, getScreenWidth } from '../reducers/selectors';

const newsEndpoint = 'http://bucurestiultinerilor.info/feed/';

const NewsWithSpinner = SpinnerHOC(View);

class NewsList extends Component {
  componentDidMount() {
    const { fetchNewsData } = this.props;
    fetchNewsData(newsEndpoint);
  }
  fetchHasErrored = () => (
    Alert.alert(
      'Oops',
      `An error has occurred. Error details: ${this.props.error}`,
      [
        {
          text: 'Retry',
          onPress: () => {
            this.props.fetchNewsData(newsEndpoint);
          },
        },
        {
          text: 'Cancel',
        },
      ],
      {
        cancelable: false,
      }
    )
  )
  render() {
    const { data, error, isLoading, onLayoutChange, screenWidth } = this.props;
    const news = data.map((item, index) => {
      return (
        <News
          author={item.author}
          content={item.content}
          key={index}
          link={item.link}
          navigation={this.props.navigation}
          pubDate={item.pubDate}
          screenWidth={screenWidth}
          title={item.title}
        />
      );
    });
    if(error) {
      return this.fetchHasErrored();
    }
    return (
      <ScrollView>
        <AdMobBanner
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          bannerSize="fullBanner"
          testDeviceID="EMULATOR"
        />
        <NewsWithSpinner
          onLayout={() => onLayoutChange(Dimensions.get('window').width)}
          spinner={isLoading}
        >
          { news }
        </NewsWithSpinner>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: getFetchData(state.newsReducer),
    error: getError(state.newsReducer),
    isLoading: getLoadingStatus(state.newsReducer),
    screenWidth: getScreenWidth(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewsData: url => dispatch(newsItemsFetchData(url)),
    onLayoutChange: value => {
      dispatch(screenWidthChange(value));
    },
  };
};

NewsList.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  fetchNewsData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  screenWidth: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
