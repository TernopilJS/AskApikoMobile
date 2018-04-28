import Expo from 'expo';
import R from 'ramda';
import { getPhoneNumbers, getTotalNumber } from '../utils/contactsHelper';

class UserDataService {
  async getContacts() { // eslint-disable-line
    const totalNumber = await getTotalNumber();

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
      ],
      pageSize: totalNumber,
      pageOffset: 0,
    });

    const contactData = contacts.data
      .reduce((acc, {
        phoneNumbers,
      }) => {
        const numbers = getPhoneNumbers(phoneNumbers);

        if (R.isEmpty(numbers)) return acc;

        return acc.concat(numbers);
      }, []);

    return contactData;
  }

  getCurrentLocation() { // eslint-disable-line
    return Expo.Location.getCurrentPositionAsync({});
  }

  getPushToken() { // eslint-disable-line
    return Expo.Notifications.getExpoPushTokenAsync();
  }
}

const userDataService = new UserDataService();

export default userDataService;
