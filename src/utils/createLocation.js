export default ({
  location_city,
  location_state,
  location_street,
  location_streetNumber,
}) => {
  const locationArr = [
    location_street,
    location_city,
    location_state,
  ];

  const locationStr = locationArr
    .filter(i => !!i && i.length !== 0)
    .join(', ');

  return location_streetNumber
    ? `${location_streetNumber} ${locationStr}`
    : locationStr;
};

export const createLocationAddress = (location) => {
  if (!location) {
    return null;
  }

  if (!!location.address) {
    return location;
  }

  const {
    location_city,
    location_state,
    location_street,
    location_streetNumber,
  } = location;

  const locationArr = [
    location_street,
    location_city,
    location_state,
  ];

  const locationStr = locationArr
    .filter(i => !!i && i.length !== 0)
    .join(', ');

  const address = location_streetNumber
    ? `${location_streetNumber} ${locationStr}`
    : locationStr;

  return {
    city: location_city,
    state: location_state,
    street: location_street,
    streetNumber: location_streetNumber,
    address,
  };
};

export const createLocationObject = ({
  location_address,
  location_streetNumber,
  location_street,
  location_city,
  location_state,
  location_country,
  location_lat,
  location_lng,
}) => {
  if (!location_lat || !location_lng || !location_address) {
    return null;
  }

  return {
    address: location_address,
    streetNumber: location_streetNumber,
    street: location_street,
    city: location_city,
    state: location_state,
    country: location_country,
    lat: location_lat,
    lng: location_lng,
  };
};
