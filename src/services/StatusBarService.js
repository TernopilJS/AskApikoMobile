import { Platform, StatusBar, AppState } from 'react-native';
import { colors } from '../styles';

const isAndroid = Platform.OS === 'android';

class StatusBarService {
  constructor() {
    this._currentStyle = null;
    this._listener = null;
  }

  get currentStyle() {
    return this._currentStyle;
  }

  setStyle(style = this._currentStyle) {
    // store the style
    this._currentStyle = style;

    // set the style
    StatusBar.setBarStyle(style, true);
  }

  init() {
    let style;
    if (isAndroid) {
      this.setTranslucent();
      this.setDefaultColor();
      style = 'light-content';
    } else {
      style = 'dark-content';
    }

    this.setStyle(style);

    this._listener = AppState.addEventListener(
      'change',
      () => this.setStyle(),
    );
  }

  unlisten() {
    AppState.removeEventListener(
      'change',
      this._listener,
    );
  }

  setTranslucent = () => {
    if (isAndroid) StatusBar.setTranslucent(true);
  };

  setTransparent = () => {
    if (isAndroid) StatusBar.setBackgroundColor('transparent', true);
  };

  setDefaultColor = () => {
    if (isAndroid) StatusBar.setBackgroundColor(colors.androidStatusBar, true);
  };

  setLightContent = () => {
    if (isAndroid) this.setStyle('light-content');
  };

  setDarkContent = () => {
    if (isAndroid) this.setStyle('dark-content');
  };

  setDarkAndTransparent = () => {
    if (isAndroid) {
      this.setDarkContent();
      this.setTransparent();
    }
  };

  setLightAndDefaultColor = () => {
    if (isAndroid) {
      this.setLightContent();
      this.setDefaultColor();
    }
  };

  setLightAndTransparent = () => {
    if (isAndroid) {
      this.setLightContent();
      this.setTransparent();
    }
  };
}

const statusBarService = new StatusBarService();

export default statusBarService;
