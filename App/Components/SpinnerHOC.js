import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

const SpinnerHOC = Component => {
  return ({ spinner, children, ...props }) => (
    <ScrollView>
		{ spinner ? <ActivityIndicator color="red" size="large" /> : <Component {...props} >{ children }</Component> }
	</ScrollView>
  );
};

export default SpinnerHOC;
