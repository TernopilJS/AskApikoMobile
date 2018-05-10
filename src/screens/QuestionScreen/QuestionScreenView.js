import React from 'react';
import T from 'prop-types'; // eslint-disable-line
import { View, Text } from 'react-native';
import s from './styles';

const QuestionScreenView = () => (
  <View style={s.container}>
    <Text>Question</Text>
  </View>
);

QuestionScreenView.propTypes = {

};

QuestionScreenView.navigationOptions = () => ({
  title: 'Question',
});

export default QuestionScreenView;
