import { compose, hoistStatics } from 'recompose';
import CreateQuestionScreen from './CreateQuestionScreenView';

const enhancer = compose(

);

export default hoistStatics(enhancer)(CreateQuestionScreen);
