import React, { PureComponent } from 'react';
import { StyleSheet, Text, ScrollView, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';

import { screenWidthChange } from '../actions/actions';

class SpecificArticle extends PureComponent {
  imageStyle = width => ({
    height: width / 2.3,
    width,
  })
  render() {
    const { author, content, date, title } = this.props.navigation.state.params;
    const { onLayoutChange, screenWidth } = this.props;
    return (
      <ScrollView onLayout={() => onLayoutChange(Dimensions.get('window').width)}>
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
    screenWidth: state.screenReducer.screenWidth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLayoutChange: value => {
      dispatch(screenWidthChange(value));
    },
  };
};

SpecificArticle.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  navigation: PropTypes.object,
  onLayoutChange: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecificArticle);
