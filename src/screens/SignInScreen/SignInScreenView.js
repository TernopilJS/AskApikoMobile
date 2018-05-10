import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';
import { Touchable } from '../../components';
import s from './styles';

const SignInScreenView = ({
  navigateToRestorePassword,
  signIn,
}) => (
  <View style={s.container}>
    <Touchable onPress={navigateToRestorePassword}>
      <Text>Navigate to Restore Password</Text>
    </Touchable>
    <Touchable onPress={signIn}>
      <Text>Sign In</Text>
    </Touchable>
  </View>
);

SignInScreenView.propTypes = {
  navigateToRestorePassword: T.func,
  signIn: T.func,
};

SignInScreenView.navigationOptions = () => ({
  title: 'Sign In',
});

export default SignInScreenView;
