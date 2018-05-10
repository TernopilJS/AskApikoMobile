import React from 'react';
import T from 'prop-types';
import { Text } from 'react-native';

const DrawerButton = props => (
  <Text style={{ width: 100, height: 50 }} onPress={props.onPress}>
    Drawer
  </Text>
);

DrawerButton.propTypes = {
  onPress: T.func,
};

export default DrawerButton;
