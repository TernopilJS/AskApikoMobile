import { Platform, StatusBar } from 'react-native';
import { selectStyle } from '../styles';

export * as momentFormats from './momentFormats';

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios'
  ? selectStyle({ iphoneX: 44, default: 20 })
  : StatusBar.currentHeight;
export const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
export const IPHONE_X_BOTTOM_PADDING = 34;

export const ANIMATION_DURATION = 350;
