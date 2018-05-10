import { createStackNavigator } from 'react-navigation';
import { screens } from './';
import SearchScreen from '../screens/SearchScreen';

export default createStackNavigator({
  [screens.Search]: { screen: SearchScreen },
});
