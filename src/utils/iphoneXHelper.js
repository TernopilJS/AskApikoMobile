import { Platform } from 'react-native';
import { dimensions } from '../styles';

const { width, height } = dimensions;

export const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812)
);

export default isIphoneX;
