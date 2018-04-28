const isInteger = num => (num ^ 0) === num ? num : false; // eslint-disable-line

export default (items, pageSize) => {
  const pages = items.length / pageSize;

  const pagesCount = isInteger(pages);

  if (!pagesCount) {
    return false;
  }

  return pagesCount + 1;
};
