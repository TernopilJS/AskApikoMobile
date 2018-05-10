import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';
import { Touchable, DrawerButton } from '../../components';
import s from './styles';

const UserQuestionsScreenView = ({
  navigateToQuestion,
}) => (
  <View style={s.container}>
    <Touchable
      onPress={navigateToQuestion}
      style={s.button}
      useOpacity
    >
      <Text>Navigate to question</Text>
    </Touchable>
  </View>
);

UserQuestionsScreenView.propTypes = {
  navigateToQuestion: T.func,
};

UserQuestionsScreenView.navigationOptions = ({ navigation }) => ({
  title: 'User questions',
  headerLeft: (
    <DrawerButton onPress={() => navigation.toggleDrawer()} />
  ),
});

export default UserQuestionsScreenView;
