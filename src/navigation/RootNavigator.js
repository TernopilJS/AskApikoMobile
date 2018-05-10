import { createSwitchNavigator } from 'react-navigation';
import { screens } from './';
import AuthorizedApplicationNavigator from './AuthorizedApplicationNavigator';
import UnauthorizedApplicationNavigator from './UnauthorizedApplicationNavigator';

export default createSwitchNavigator({
  [screens.AuthorizedApplication]: { screen: AuthorizedApplicationNavigator },
  [screens.UnauthorizedApplication]: { screen: UnauthorizedApplicationNavigator },
}, { initialRouteName: screens.UnauthorizedApplication });
