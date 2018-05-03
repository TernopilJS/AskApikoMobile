import { compose } from 'recompose';
import { connect } from 'react-redux';
import { appSelectors, appOperations } from '../../modules/app';
import WelcomeScreen from './WelcomeScreenView';

const mapStateToProps = state => ({
  counter: appSelectors.getCounter(state),
});

const mapDispatchToProps = {
  increment: appOperations.increment,
  decrement: appOperations.decrement,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhancer(WelcomeScreen);
