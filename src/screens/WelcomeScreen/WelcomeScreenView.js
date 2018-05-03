import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';
import { Touchable } from '../../components';
import s from './styles';

const WelcomeScreen = ({
  counter,
  increment,
  decrement,
}) => (
  <View style={s.container}>
    <Text>Count: {counter}</Text>

    <Touchable
      onPress={increment}
      onLongPress={decrement}
      style={s.button}
      useOpacity
    >
      <Text>Change counter</Text>
    </Touchable>
  </View>
);

WelcomeScreen.propTypes = {
  counter: T.number,
  increment: T.func,
  decrement: T.func,
};

export default WelcomeScreen;
