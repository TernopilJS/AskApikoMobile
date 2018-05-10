import React from 'react';
import T from 'prop-types'; // eslint-disable-line
import { View, Text } from 'react-native';
import { DrawerButton } from '../../components';
import s from './styles';

const SearchScreenView = () => (
  <View style={s.container}>
    <Text>Search</Text>
  </View>
);

SearchScreenView.propTypes = {

};

SearchScreenView.navigationOptions = ({ navigation }) => ({
  title: 'Search',
  headerLeft: (
    <DrawerButton onPress={() => navigation.toggleDrawer()} />
  ),
});

export default SearchScreenView;
