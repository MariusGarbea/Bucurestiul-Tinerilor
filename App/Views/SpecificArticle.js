import React, { PureComponent } from 'react';
import { StyleSheet, Text, ScrollView, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';

export default class SpecificArticle extends PureComponent {
  constructor() {
    super();
    const width = Dimensions.get('window').width;
    this.state = {
      width,
    };
    this.onLayout = this.onLayout.bind(this);
  }
  onLayout() {
    const width = Dimensions.get('window').width;
    this.setState({
      width,
    });
  }
  render() {
    const { author, content, date, title } = this.props.navigation.state.params;
    return (
      <ScrollView onLayout={() => this.onLayout()}>
        <Image
         resizeMode="contain"
         source={{ uri: 'https://bucurestiultinerilor.info/wp-content/uploads/2017/03/Bucurestiul_Tinerilor_Logo_4cm-01.jpg' }}
         style={{ width: this.state.width, height: this.state.width / 2.3 }}
        />
        <Text>{ title }</Text>
        <Text>by { author } | { date }</Text>
        <HTMLView
         stylesheet={styles}
         value={content}
        />
      </ScrollView>
    );
  }
}

SpecificArticle.PropTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const $nicePink = '#FF3366';

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: $nicePink,
  },
});
