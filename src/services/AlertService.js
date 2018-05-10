import { Alert } from 'react-native';
import i18n from '../i18n';

class AlertService {
  showAlert(title, subTitle, buttons, options) { //eslint-disable-line
    Alert.alert(
      title, subTitle, buttons, options,
    );
  }

  showAlertWithTimeout(
    title,
    subtitle,
    timeout,
  ) {
    setTimeout(
      () => this.showAlert(title, subtitle),
      timeout,
    );
  }

  signOut(onPress) {
    this.showAlert(
      'Sign Out',
      'Are you sure?',
      [
        { text: 'Yes', onPress },
        { text: 'No', style: 'cancel' },
      ],
    );
  }
}

const alertService = new AlertService();

export default alertService;
