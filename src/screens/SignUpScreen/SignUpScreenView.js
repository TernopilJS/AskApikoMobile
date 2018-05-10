import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';
import { Touchable, DrawerButton } from '../../components';
import s from './styles';

const SignUpScreenView = ({
  navigateToSignIn,
  signUp,
}) => (
  <View style={s.container}>
    <Touchable onPress={navigateToSignIn}>
      <Text>Navigate to Sign in</Text>
    </Touchable>
    <Touchable onPress={signUp}>
      <Text>Sign Up</Text>
    </Touchable>
  </View>
);

SignUpScreenView.propTypes = {
  navigateToSignIn: T.func,
  signUp: T.func,
};

SignUpScreenView.navigationOptions = ({ navigation }) => ({
  title: 'Sign Up',
  headerLeft: (
    <DrawerButton onPress={() => navigation.toggleDrawer()} />
  ),
});

export default SignUpScreenView;
