import { compose, hoistStatics } from 'recompose';
import AboutUsScreen from './AboutUsScreenView';

const enhancer = compose(
);

export default hoistStatics(enhancer)(AboutUsScreen);
