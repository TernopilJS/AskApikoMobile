import { NavigationActions } from 'react-navigation';
import { screens } from '../../navigation';

export const navigateToAuthorized = () =>
  NavigationActions.navigate({ routeName: screens.AuthorizedApplication });
export const navigateToUnauthorized = () =>
  NavigationActions.navigate({ routeName: screens.AuthorizedApplication });
