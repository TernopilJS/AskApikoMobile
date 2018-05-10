import React from 'react';
import T from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Touchable } from '../';
import s from './styles';
import { colors } from '../../styles';

const DrawerButton = ({
  onPress,
}) => (
  <Touchable
    style={s.icon}
    onPress={onPress}
    useOpacity
    borderless
  >
    <Ionicons
      color={colors.drawerButton.color}
      size={28}
      name="ios-menu"
    />
  </Touchable>
);

DrawerButton.propTypes = {
  onPress: T.func,
};

export default DrawerButton;
