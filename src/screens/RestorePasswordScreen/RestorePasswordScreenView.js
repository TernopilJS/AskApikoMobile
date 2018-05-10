import React from 'react';
import T from 'prop-types'; // eslint-disable-line
import { View, Text } from 'react-native';
import s from './styles';

const RestorePasswordScreenView = () => (
  <View style={s.container}>
    <Text>Restore password</Text>
  </View>
);

RestorePasswordScreenView.propTypes = {

};

RestorePasswordScreenView.navigationOptions = () => ({
  title: 'Restore Password',
});

export default RestorePasswordScreenView;
