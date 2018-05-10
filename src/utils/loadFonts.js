import { Font } from 'expo';

const loadFonts = async () => {
  await Promise.all([
    Font.loadAsync({
    }),
  ]);
};

export default loadFonts;
