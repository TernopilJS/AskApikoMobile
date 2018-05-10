import I18n from 'ex-react-native-i18n';
import en from './locales/en.json';

I18n.fallbacks = true;

I18n.defaultLocale = 'en';

I18n.translations = {
  en,
};

export default I18n;
