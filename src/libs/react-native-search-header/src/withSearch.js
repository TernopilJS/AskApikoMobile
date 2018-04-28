import { Animated } from 'react-native';
import {
  withHandlers,
  compose,
  withState,
  withPropsOnChange,
  lifecycle,
} from 'recompose';
import * as constants from '../../../constants';

export const setParam = (nav, param, value) => nav.setParams({ [param]: value });

const animate = (from, to, duration = constants.ANIMATION_DURATION) =>
  Animated.timing(from, { toValue: to, duration });

const withSearch = compose(
  withState('isExpanded', 'toggleExpanded', true),
  withState('marginTop', 'setMarginTop', () => new Animated.Value(constants.HEADER_HEIGHT)),
  withPropsOnChange(
    ['isExpanded'],
    ({ isExpanded, marginTop }) => {
      if (isExpanded) {
        animate(marginTop, constants.HEADER_HEIGHT).start();
      }
      if (!isExpanded) {
        animate(marginTop, 0).start();
      }
    },
  ),
  withHandlers({
    onFocusSearch: props => () => {
      setParam(props.navigation, 'header', 'hide');
      props.toggleExpanded(false);
    },
    onCancelSearch: props => () => {
      setParam(props.navigation, 'header', 'show');
      props.toggleExpanded(true);
    },
  }),
  lifecycle({
    componentWillUnmount() {
      setParam(this.props.navigation, 'header', 'show');
    },
  }),
);

export default withSearch;
