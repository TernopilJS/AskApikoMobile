import { compose, hoistStatics } from 'recompose';
import QuestionScreen from './QuestionScreenView';

const enhancer = compose(

);

export default hoistStatics(enhancer)(QuestionScreen);
