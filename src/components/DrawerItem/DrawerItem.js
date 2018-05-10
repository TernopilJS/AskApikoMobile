import React from 'react';
import T from 'prop-types';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { Touchable, Separator } from '../';
import s from './styles';
import { colors } from '../../styles';

const DrawerItem = ({
  item,
  activeItemKey,
  navigation,
}) => {
  if (item.separator) {
    return <Separator />;
  }
  
  const isActive = item.key === activeItemKey;

  const onPress = () => {
    if (typeof item.onPress === 'function') {
      item.onPress();
    } else {
      navigation.navigate(item.key);
    }

    // we don't have a navigation.closeDrawer action
    // but we still are able to dispatch that action manually
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <Touchable onPress={onPress}>
      <View style={[s.container, isActive && s.activeContainer]}>
        <View style={s.icon}>
          <Ionicons
            color={isActive
              ? colors.drawerItem.activeIcon
              : colors.drawerItem.icon
            }
            size={28}
            name={item.iconName}
          />
        </View>
        <Text style={[s.title, isActive && s.activeTitle]}>
          {item.label}
        </Text>
      </View>
    </Touchable>
  );
};

DrawerItem.propTypes = {
  item: T.shape({
    label: T.string,
    key: T.string,
    iconName: T.string,
    onPress: T.func,
    separator: T.bool,
  }),
  activeItemKey: T.string,
  navigation: T.object,
};

export default DrawerItem;
