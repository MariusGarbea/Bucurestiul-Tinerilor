// Use Card Image from NativeBase

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class NewsList extends PureComponent {
  render() {
    const { author, pubDate, title } = this.props;
    return (
      <View>
        <Text>{ author }</Text>
        <Text>{ pubDate }</Text>
        <Text>{ title }</Text>
      </View>
    );
  }
}

NewsList.propTypes = {
  author: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({

});
