import React from 'react';
import T from 'prop-types';
import { View, Image } from 'react-native';
import s from './styles';
import logo from '../../../assets/images/logo.png';

const Logo = ({
  borderBottom,
  borderTop,
}) => (
  <View style={[
    s.container,
    borderBottom && s.borderBottom,
    borderTop && s.borderTop,
  ]}
  >
    <Image
      source={logo}
      style={s.image}
    />
  </View>
);


Logo.propTypes = {
  borderBottom: T.bool,
  borderTop: T.bool,
};

export default Logo;
