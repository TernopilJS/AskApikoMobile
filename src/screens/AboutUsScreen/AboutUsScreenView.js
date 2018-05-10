import React from 'react';
import { WebView } from 'react-native';
import { DrawerButton } from '../../components';
import s from './styles';

const AboutUsScreenScreenView = () => (
  <WebView
    style={s.container}
    source={{ uri: 'https://google.com' }}
  />
);

AboutUsScreenScreenView.navigationOptions = ({ navigation }) => ({
  title: 'About us',
  headerLeft: (
    <DrawerButton onPress={() => navigation.toggleDrawer()} />
  ),
});

export default AboutUsScreenScreenView;
