import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 52,
    backgroundColor: colors.drawerItem.background,
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeContainer: {
    backgroundColor: colors.drawerItem.activeBackground,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.drawerItem.text,
  },
  activeTitle: {
    color: colors.drawerItem.activeText,
  },
  borderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.drawerItem.border,
  },
});

export default styles;
