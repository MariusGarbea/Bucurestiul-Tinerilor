import React from 'react';
import { StyleSheet, View, Text, Linking, Button, Alert } from 'react-native';

import SpinnerHOC from '../Components/SpinnerHOC';

const AboutWithSpinner = SpinnerHOC(View);

const About = () => (
  <AboutWithSpinner>
    <Text>
      Viziunea noastră este o capitală în care tinerii au șanse egale de a beneficia și a creea oportunități.
      Misiunea noastră este de a conecta tinerii la tineri similari lor prin creearea unei comunități.
    </Text>
    <Text>Vrei sa contribui?</Text>
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
      title="Haide!"
      />
  </AboutWithSpinner>
);

const styles = StyleSheet.create({

});

export default About;
