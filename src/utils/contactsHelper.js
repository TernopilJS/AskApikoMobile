import R from 'ramda';
import { Platform } from 'react-native';
import Expo from 'expo';

export const getPhoneNumbers = (phoneNumbers) => {
  let numbers = [];

  if (!(R.isNil(phoneNumbers) || R.isEmpty(phoneNumbers))) {
    if (Platform.OS === 'android') {
      numbers = phoneNumbers.map(R.path(['number']));
    } else {
      numbers = phoneNumbers.map(R.path(['digits']));
    }
  }

  return numbers;
};

export const getTotalNumber = async () => {
  const getInitialContact = await Expo.Contacts.getContactsAsync({
    fields: [
      Expo.Contacts.PHONE_NUMBERS,
    ],
    pageSize: 1,
  });

  return getInitialContact.total;
};

