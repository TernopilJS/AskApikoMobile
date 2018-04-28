import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, ViewPropTypes } from 'react-native';
import { Header } from 'react-navigation';
import { compose, withProps, withPropsOnChange, lifecycle } from 'recompose';
import R from 'ramda';
import { colors, selectStyle } from '../../../styles';
import { HEADER_HEIGHT, ANIMATION_DURATION } from '../../../constants';

const animate = (from, to, duration = ANIMATION_DURATION) =>
  Animated.timing(from, { toValue: to, duration });

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.searchBox.headerBackground,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  header: {
    backgroundColor: colors.searchBox.headerBackground,
    borderBottomWidth: 0,
    // borderBottomColor: colors.border,
    shadowOpacity: 0,
  },
});

const AnimatedHeader = ({ top, second, backgroundColor, ...props }) => (
  <Animated.View style={[styles.root, { top, opacity: second }]}>
    <Header
      {...props}
      style={[styles.header]}
    />
  </Animated.View>
);

AnimatedHeader.propTypes = {
  height: PropTypes.object,
  backgroundColor: PropTypes.object,
  style: ViewPropTypes.style,
  top: PropTypes.any,
};

let animatedValue = new Animated.Value(0);
let animatedValueSecond = new Animated.Value(1);

export default compose(
  withProps((props) => {
    const header = R.view(R.lensPath(['route', 'params', 'header']), props.scene);

    if (header === 'notShow') {
      animatedValue = new Animated.Value(-HEADER_HEIGHT);
      animatedValueSecond = new Animated.Value(0);
    }

    return {
      top: animatedValue,
      second: animatedValueSecond,
      header,
    };
  }),
  withPropsOnChange(
    ['header'],
    ({ header, top, second }) => {
      if (header === 'hide') {
        animate(top, -HEADER_HEIGHT).start(() => second.setValue(0));
      }
      if (header === 'show') {
        second.setValue(1);
        animate(top, 0).start();
      }
    },
  ),
  lifecycle({
    componentWillUnmount() {
      animatedValue = new Animated.Value(0);
      animatedValueSecond = new Animated.Value(1);
    },
  }),
)(AnimatedHeader);
