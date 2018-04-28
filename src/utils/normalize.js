export default (arr, id = 'id') => {
  const normalized = {
    ids: [],
    map: {},
  };
  
  if (Array.isArray(arr)) {
    arr.reduce((acc, val) => {
      acc.ids.push(val[id]);
      acc.map[val[id]] = val;

      return acc;
    }, normalized);
  }

  return normalized;
};
