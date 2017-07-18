import React, { PureComponent } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Card, CardItem, Left, Right, Body } from 'native-base';

export default class News extends PureComponent {
  imageStyle = width => ({
    height: width / 2.3,
    width,
  })
  render() {
    const { author, content, link, pubDate, screenWidth, title } = this.props;
    const date = pubDate.substring(5, 16);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => this.props.navigation.navigate('SpecificArticle', {
          author,
          content,
          date,
          link,
          title,
        })}
      >
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
               resizeMode="center"
               source={{ uri: 'https://bucurestiultinerilor.info/wp-content/uploads/2017/03/Bucurestiul_Tinerilor_Logo_4cm-01.jpg' }}
               style={this.imageStyle(screenWidth)}
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
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  pubDate: PropTypes.string.isRequired,
  screenWidth: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({

});
