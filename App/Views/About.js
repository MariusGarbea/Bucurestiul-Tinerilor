import React from 'react';
import { StyleSheet, View, Text, Linking, Button, Alert } from 'react-native';

import SpinnerHOC from '../Components/SpinnerHOC';

const AboutWithSpinner = SpinnerHOC(View);

const About = () => (
  <AboutWithSpinner>
    <Text>Wanna contribute to our app? </Text>
    <Button
      onPress={() =>
        Linking.canOpenURL('https://github.com/MariusGarbea/Bucurestiul-Tinerilor')
        .then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: https://github.com/MariusGarbea/Bucurestiul-Tinerilor');
          } else {
            return Linking.openURL('https://github.com/MariusGarbea/Bucurestiul-Tinerilor');
          }
        })
        .catch(err => Alert.alert('An error occurred', err))}
      title="Do it here"
      />
  </AboutWithSpinner>
);

const styles = StyleSheet.create({

});

export default About;
