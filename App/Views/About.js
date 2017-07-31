import React from 'react';
import { StyleSheet, View, Text, Linking, Button, Alert, ScrollView } from 'react-native';
import { AdMobBanner } from 'react-native-admob';

import SpinnerHOC from '../Components/SpinnerHOC';

const AboutWithSpinner = SpinnerHOC(View);

const About = () => (
  <ScrollView>
    <AdMobBanner adUnitID="ca-app-pub-3940256099942544/6300978111" />
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
            if (supported) {
              return Linking.openURL('https://github.com/MariusGarbea/Bucurestiul-Tinerilor');
            }
          })
          .catch(err => Alert.alert('An error occurred', err))}
        title="Haide!"
        />
    </AboutWithSpinner>
  </ScrollView>
);

const styles = StyleSheet.create({

});

export default About;
