import { compose, hoistStatics } from 'recompose';
import ProfileScreen from './ProfileScreenView';

const enhancer = compose(

);

export default hoistStatics(enhancer)(ProfileScreen);
