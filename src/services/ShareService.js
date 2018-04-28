import { Share } from 'react-native';
import i18n from '../i18n';

const inviteLink = 'google.com';

class ShareService {
  shareInvite() {
    this.share(
      i18n.t('sharing.invite.title'),
      i18n.t('sharing.invite.message', { inviteLink }),
    );
  }

  share(title, message) { // eslint-disable-line
    Share.share({
      title,
      message,
    });
  }
}

const shareService = new ShareService();

export default shareService;
