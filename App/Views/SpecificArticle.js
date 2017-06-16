import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class SpecificArticle extends Component {
  render() {
  	const { author, title } = this.props.navigation.state.params
	return (
	  <View>
	  	<Text>{ title }</Text>
		<Text>by { author }</Text>
	  </View>
	);
  }
}

const styles = StyleSheet.create({

});
