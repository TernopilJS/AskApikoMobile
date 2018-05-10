import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 144,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 34,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  borderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
});

export default styles;
