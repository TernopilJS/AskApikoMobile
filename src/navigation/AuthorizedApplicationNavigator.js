import { createDrawerNavigator } from 'react-navigation';
import { screens } from './';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import CreateQuestionNavigator from './CreateQuestionNavigator';
import ProfileNavigator from './ProfileNavigator';
import AboutUsNavigator from './AboutUsNavigator';
import { AuthorizedDrawer } from './components';

export default createDrawerNavigator({
  [screens.Home]: {
    screen: HomeNavigator,
    drawerLabel: 'Home',
  },
  [screens.Search]: {
    screen: SearchNavigator,
    drawerLabel: 'Search',
  },
  [screens.CreateQuestion]: {
    screen: CreateQuestionNavigator,
    drawerLabel: 'CreateQuestion',
  },
  [screens.Profile]: {
    screen: ProfileNavigator,
    drawerLabel: 'Profile',
  },
  [screens.AboutUs]: {
    screen: AboutUsNavigator,
    drawerLabel: 'About Us',
  },
}, {
  // drawerWidth: 300,
  drawerPosition: 'left',
  contentComponent: AuthorizedDrawer,
});
