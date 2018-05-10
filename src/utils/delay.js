const delay = timeout => new Promise((res) => {
  setTimeout(() => {
    res();
  }, timeout);
});

export default delay;
