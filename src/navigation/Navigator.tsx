import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './stack/AppStack';

const Navigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Navigator;
