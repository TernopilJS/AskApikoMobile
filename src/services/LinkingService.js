import { Linking, Alert } from 'react-native';
import i18n from '../i18n';

const termsLink = 'terms';
const privacyLink = 'privacy';

class LinkingService {
  openTerms() {
    this.openUrl(termsLink);
  }

  openPrivacy() {
    this.openUrl(privacyLink);
  }

  openUrl(url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          return this._showErrorAlert();
        }

        return Linking.openURL(url);
      }).catch(() => this._showErrorAlert());
  }

  _showErrorAlert() { // eslint-disable-line
    Alert.alert(
      i18n.t('errors.somethingWrong'),
      i18n.t('errors.openLinkError'),
    );
  }
}

const linkingService = new LinkingService();

export default linkingService;
