// Use Card Image from NativeBase

import React, { PureComponent } from 'react';
import { StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Card, CardItem, Left, Right, Body } from 'native-base';

const width = Dimensions.get('window').width;

export default class News extends PureComponent {
  render() {
    const { author, pubDate, title } = this.props;
    const date = pubDate.substring(5, 16);
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('SpecificArticle')} >
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>{ title }</Text>
                  <Text>by { author }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                resizeMode="contain"
                source={{ uri: 'https://bucurestiultinerilor.info/wp-content/uploads/2017/03/Bucurestiul_Tinerilor_Logo_4cm-01.jpg' }}
                style={styles.image}
              />
            </CardItem>
            <CardItem>
              <Right>
                <Text>{ date }</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </TouchableOpacity>
    );
  }
}

News.propTypes = {
  author: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  pubDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width,
    height: width / 2.3,
  },
});
