import R from 'ramda';
import { Platform } from 'react-native';
import { parse } from 'libphonenumber-js';

export const getPhoneNumbers = (phoneNumbers, defaultCountry) => {
  let numbers = [];

  if (Platform.OS === 'android') {
    if (!(R.isNil(phoneNumbers) || R.isEmpty(phoneNumbers))) {
      numbers = phoneNumbers.reduce((acc, item) => {
        const { phone, country } =
          parse(item.number, { defaultCountry, extended: true });

        if (phone) return acc.concat({ digits: phone, countryCode: country });
        return acc;
      }, []);
    }
  } else {
    numbers = phoneNumbers && phoneNumbers
      .map(R.pick(['digits', 'countryCode']));
  }

  return numbers;
};
