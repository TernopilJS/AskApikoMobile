import React from 'react';
import T from 'prop-types'; // eslint-disable-line
import { View, Text } from 'react-native';
import { DrawerButton } from '../../components';
import s from './styles';

const CreateQuestionScreenView = () => (
  <View style={s.container}>
    <Text>CreateQuestion</Text>
  </View>
);

CreateQuestionScreenView.propTypes = {

};

CreateQuestionScreenView.navigationOptions = ({ navigation }) => ({
  title: 'CreateQuestion',
  headerLeft: (
    <DrawerButton onPress={() => navigation.toggleDrawer()} />
  ),
});

export default CreateQuestionScreenView;
