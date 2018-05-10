import { createStackNavigator } from 'react-navigation';
import { screens } from './';
import ProfileScreen from '../screens/ProfileScreen';

export default createStackNavigator({
  [screens.Profile]: { screen: ProfileScreen },
});
