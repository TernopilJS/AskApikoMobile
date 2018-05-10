import { compose, withHandlers, hoistStatics } from 'recompose';
import UserQuestionsScreen from './UserQuestionsScreenView';
import { screens } from '../../navigation';

const enhancer = compose(
  withHandlers({
    navigateToQuestion: props => () => props.navigation.navigate(screens.Question),
  }),
);

export default hoistStatics(enhancer)(UserQuestionsScreen);
