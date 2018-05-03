import { Platform, StatusBar } from 'react-native';
import { selectStyle } from '../styles';

export const STATUSBAR_HEIGHT = Platform.OS === 'ios'
  ? selectStyle({ iphoneX: 44, default: 20 })
  : StatusBar.currentHeight;
