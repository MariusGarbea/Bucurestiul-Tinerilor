import React, { PureComponent } from 'react';
import { StyleSheet, Text, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';

import { getScreenWidth } from '../reducers/selectors';

class SpecificArticle extends PureComponent {
  imageStyle = width => ({
    height: width / 2.3,
    width,
  })
  render() {
    const { author, content, date, title } = this.props.navigation.state.params;
    const { screenWidth } = this.props;
    return (
      <ScrollView>
        <Image
         resizeMode="contain"
         source={{ uri: 'https://bucurestiultinerilor.info/wp-content/uploads/2017/03/Bucurestiul_Tinerilor_Logo_4cm-01.jpg' }}
         style={this.imageStyle(screenWidth)}
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

const mapStateToProps = state => {
  return {
    screenWidth: getScreenWidth(state),
  };
};

SpecificArticle.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  navigation: PropTypes.object,
  screenWidth: PropTypes.number.isRequired,
  title: PropTypes.string,
};

const $nicePink = '#FF3366';

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: $nicePink,
  },
});

export default connect(mapStateToProps)(SpecificArticle);
