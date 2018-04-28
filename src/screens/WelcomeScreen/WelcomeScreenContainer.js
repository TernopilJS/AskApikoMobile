import { compose } from 'recompose';
import { connect } from 'react-redux';
import { appSelectors, appOperations } from '../../modules/app';
import WelcomeScreen from './WelcomeScreenView';

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = {
  
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhancer(WelcomeScreen);
