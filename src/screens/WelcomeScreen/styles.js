import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.welcomeScreen.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.white,
    padding: 4,
    marginTop: 16,
    borderRadius: 4,
  },
});

export default styles;
