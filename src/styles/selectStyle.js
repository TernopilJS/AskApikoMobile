import { isIphoneX } from '../utils/iphoneXHelper';

const PREFIXES = {
  iphoneX: 'iphoneX',
  default: 'default',
};
// 375 × 667
const DIMENSIONS = {
  IPHONE_X: {
    test: () => isIphoneX,
    prefix: PREFIXES.iphoneX,
  },
};

const getRightPhone = () => Object.keys(DIMENSIONS)
  .map(key => DIMENSIONS[key])
  .find(item => item.test());

/**
 * Styles selector function. Returns right style for the device
 * @param {object} styles - styles object by prefixes.
 * should contain at least default prop.
 */
export default function selectStyle(styles) {
  const rightPhone = getRightPhone();

  if (typeof rightPhone !== 'undefined' &&
    typeof styles[rightPhone.prefix] !== 'undefined') {
    return styles[rightPhone.prefix];
  } else if (typeof styles[PREFIXES.default] !== 'undefined') {
    return styles[PREFIXES.default];
  }

  throw new Error('Styles selector should contain at least default prop.');
}
