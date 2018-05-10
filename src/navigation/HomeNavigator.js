import { createStackNavigator } from 'react-navigation';
import { screens } from './';
import UserQuestionsScreen from '../screens/UserQuestionsScreen';
import QuestionScreen from '../screens/QuestionScreen';

export default createStackNavigator({
  [screens.UserQuestions]: { screen: UserQuestionsScreen },
  [screens.Question]: { screen: QuestionScreen },
}, {
  headerTransitionPreset: 'uikit',
});
