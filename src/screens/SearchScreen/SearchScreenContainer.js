import { compose, hoistStatics } from 'recompose';
import SearchScreen from './SearchScreenView';

const enhancer = compose(

);

export default hoistStatics(enhancer)(SearchScreen);
