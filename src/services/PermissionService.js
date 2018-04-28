import Expo from 'expo';
import { Alert, Linking, AppState, Platform } from 'react-native';
import PQueue from 'p-queue';
import pWaitFor from 'p-wait-for';
import delay from 'delay';
import i18n from '../i18n';
import { PermissionDeniedError } from '../errors';

const isAndroid = Platform.OS === 'android';

// creating promise's queue with concurrence = 1
// because we don't really need to show all the alerts
// at the same time
const queue = new PQueue({ concurrency: 1 });

/**
 * Allows to ask for some permission and deal with denying it
 *
 * @class PermissionService
 */
class PermissionService {
  // define all the permissions
  Location = 'location';
  Contacts = 'contacts';
  Notifications = 'notifications';
  Camera = 'camera';
  Microphone = 'microphone';

  constructor() {
    // all permissions states
    this.permissions = {
      [this.Location]: false,
      [this.Contacts]: false,
      [this.Notifications]: false,
      [this.Camera]: false,
      [this.Microphone]: false,
    };
  }

  /**
   * Get permission state
   *
   * @param {PermissionService.*} name permission name
   */
  getPermissionState(name) {
    return this.permission[name];
  }

  /**
   * Ask for Location permission async
   *
   * @param {boolean} [waitForSet=false] wait for resolving permission
   * from settings
   * @returns Promise
   * @memberof PermissionService
   */
  getLocationPermission(waitForSet = false) {
    return this._askForPermission(
      Expo.Permissions.LOCATION,
      this.Location,
      this._showDeniedAlert(
        'LOCATION',
        i18n.t('permissions.titles.location'),
        isAndroid
          ? i18n.t('permissions.android.location')
          : i18n.t('permissions.location'),
      ),
      waitForSet,
    );
  }
  /**
   * Ask for Notifications permission async
   *
   * @param {boolean} [waitForSet=false] wait for resolving permission
   * from settings
   * @returns Promise
   * @memberof PermissionService
   */
  getNotificationsPermission(waitForSet = false) {
    return this._askForPermission(
      Expo.Permissions.NOTIFICATIONS,
      this.Notifications,
      this._showDeniedAlert(
        'NOTIFICATIONS',
        i18n.t('permissions.titles.notifications'),
        isAndroid
          ? i18n.t('permissions.android.notifications')
          : i18n.t('permissions.notifications'),
      ),
      waitForSet,
    );
  }

  /**
   * Ask for Contacts permission async
   *
   * @param {boolean} [waitForSet=false] wait for resolving permission
   * from settings
   * @returns Promise
   * @memberof PermissionService
   */
  getContactsPermission(waitForSet = false) {
    return this._askForPermission(
      Expo.Permissions.CONTACTS,
      this.Contacts,
      this._showDeniedAlert(
        'CONTACTS',
        i18n.t('permissions.titles.contacts'),
        isAndroid
          ? i18n.t('permissions.android.contacts')
          : i18n.t('permissions.contacts'),
      ),
      waitForSet,
    );
  }

  /**
   * Ask for Camera permission async
   *
   * @param {boolean} [waitForSet=false] wait for resolving permission
   * from settings
   * @returns Promise
   * @memberof PermissionService
   */
  getCameraPermission() {
    return this._askForPermission(
      Expo.Permissions.CAMERA,
      this.Camera,
      this._showDeniedAlert(
        'CAMERA',
        i18n.t('permissions.titles.camera'),
        isAndroid
          ? i18n.t('permissions.android.camera')
          : i18n.t('permissions.camera'),
      ),
    );
  }

  /**
   * Ask for Microphone permission async
   *
   * @param {boolean} [waitForSet=false] wait for resolving permission
   * from settings
   * @returns Promise
   * @memberof PermissionService
   */
  getMicrophonePermission() {
    return this._askForPermission(
      Expo.Permissions.AUDIO_RECORDING,
      this.Microphone,
      this._showDeniedAlert(
        'AUDIO_RECORDING',
        i18n.t('permissions.titles.microphone'),
        isAndroid
          ? i18n.t('permissions.android.microphone')
          : i18n.t('permissions.microphone'),
      ),
    );
  }

  /**
   * Set permission state
   *
   * @param {String} name permission name
   * @param {boolean} value permission value
   * @memberof PermissionService
   */
  _setPermission(name, value) {
    this.permissions[name] = value;
  }

  /**
   * Shows alert for denied permission
   *
   * @param {String} name permission name
   * @param {String} localizedtitle localized title for alert
   * @param {String} localizedSubtitle localized subtitle for alert
   * @returns Fuction with promise
   * @memberof PermissionService
   */
  _showDeniedAlert(name, localizedtitle, localizedSubtitle) { // eslint-disable-line
    return () => new Promise((res, rej) => {
      const showAlert = () => Alert.alert(
        localizedtitle,
        localizedSubtitle,
        [
          {
            text: i18n.t('common.Cancel'),
            style: 'cancel',
            onPress: rej,
          },
          {
            text: i18n.t('common.Settings'),
            onPress: () => {
              // IOS
              // try to navigate to specific settings route
              if (!isAndroid) {
                Linking.openURL('app-settings:');
              }
              // and resolve the promise
              // for ANDROID navigate to settings after resolving the promise
              res();
            },
          },
        ],
        { cancelable: false },
      );

      setTimeout(showAlert, 100);
    });
  }

  /**
   * Asking for some permission.
   * Trying to get permission and if it not granted ask for it.
   * Then gonna show denied alerts and wait for user to set it via settings
   *
   * @param {any} permission Permission name (PermissionService.*)
   * @param {any} localName local permission name
   * @param {any} onDenied callback if user has denied permission
   * @param {any} waitForSet flag if we want to wait for user to set permission
   * in the settings
   * @returns Promise
   * @memberof PermissionService
   */
  _askForPermission(permission, localName, onDenied, waitForSet) {
    // creating promise so we can add it to queue
    const promise = async () => {
      try {
        // trying to get exist permission
        let permissionResult = await Expo.Permissions.getAsync(permission);

        // IOS
        // check if permission hasn't been asked before
        // if never asked, show only native alert
        // notifications permission has only 2 statuses - 'undetermined, granted',
        // so we cant't check if the permission has been asked before
        // and we need to show both native and custom alerts
        if (!isAndroid
            && permissionResult.status === 'undetermined'
            && localName !== this.Notifications) {
          permissionResult = await Expo.Permissions.askAsync(permission);

          if (permissionResult.status !== 'granted') {
            throw new PermissionDeniedError(localName);
          }

        // IOS and ANDROID
        } else if (permissionResult.status !== 'granted') {
          permissionResult = await Expo.Permissions.askAsync(permission);

          // if user denied permission
          if (permissionResult.status !== 'granted') {
            this._setPermission(localName, false);

            if (typeof onDenied !== 'undefined') {
              // if we gonna show denied alert – showing it
              await onDenied();

              // ANDROID
              // navigate to settings
              // startActivityAsync() will return a promise
              // which resolves when the user returns to the app
              if (isAndroid) {
                await Expo.IntentLauncherAndroid.startActivityAsync(
                  Expo.IntentLauncherAndroid.ACTION_APPLICATION_SETTINGS,
                );

              // IOS
              // if we really need to user set the permission
              // before we gonna do some stuff
              // just waiting for user to set it in the settings
              } else if (waitForSet) {
                await this._waitForPermission();
              }

              // checking permission again
              permissionResult = await Expo.Permissions.getAsync(permission);

              // if user hasn't allow it via settings throw the error
              if (permissionResult.status !== 'granted') {
                throw new PermissionDeniedError(localName);
              }
            }

            // returning permission state immediately
            return false;
          }
        }

        this._setPermission(localName, true);

        // returning permission state immediately
        return true;
      } catch (err) {
        // if user has denied the permission throwing error to the top
        throw new PermissionDeniedError(localName);
      }
    };

    // adding promise to the queue
    // because we aren't gonna show all the alerts at the same time
    return queue.add(promise);
  }

  /**
   * Waiting for user to set permission in the settings
   *
   * @memberof PermissionService
   */
  async _waitForPermission(permission, localName) { // eslint-disable-line
    // waiting for the app to go background
    await delay(1000);
    // waiting for the app to go foreground (active)
    await pWaitFor(() => AppState.currentState !== 'active');
    // waiting a little bit for animation
    await delay(1000);
  }
}

const permissionService = new PermissionService();

export default permissionService;
