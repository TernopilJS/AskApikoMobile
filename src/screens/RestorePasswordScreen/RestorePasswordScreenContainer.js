import { compose, hoistStatics } from 'recompose';
import RestorePasswordScreen from './RestorePasswordScreenView';

const enhancer = compose(

);

export default hoistStatics(enhancer)(RestorePasswordScreen);
