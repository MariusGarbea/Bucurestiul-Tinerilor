import React, { PureComponent } from 'react';
import { StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Card, CardItem, Left, Right, Body } from 'native-base';

export default class News extends PureComponent {
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
    const { author, content, link, pubDate, title } = this.props;
    const date = pubDate.substring(5, 16);
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('SpecificArticle', {
        author,
        content,
        date,
        link,
        title,
      })}>
        <Content onLayout={() => this.onLayout()}>
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
               style={{ width: this.state.width, height: this.state.width / 2.3 }}
              />
            </CardItem>
            <CardItem>
              <Right>
                <Text>🕓 { date }</Text>
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
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({

});
