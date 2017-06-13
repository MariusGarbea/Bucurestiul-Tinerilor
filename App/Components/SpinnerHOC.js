import React from 'react';
import { ScrollView } from 'react-native';
import { Spinner } from 'native-base';

const SpinnerHOC = Component => {
  return ({ spinner, children, ...props }) => (
    <ScrollView>
		{ spinner ? <Spinner /> : <Component {...props} >{ children }</Component> }
	</ScrollView>
  );
};

export default SpinnerHOC;
