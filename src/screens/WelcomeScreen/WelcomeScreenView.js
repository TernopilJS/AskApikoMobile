import React from 'react';
// import T from 'prop-types';
import { View, Text } from 'react-native';
import s from './styles';

const WelcomeScreen = () => (
  <View style={s.container}>
    <Text>Hello world</Text>
  </View>
);

WelcomeScreen.propTypes = {

};

export default WelcomeScreen;
