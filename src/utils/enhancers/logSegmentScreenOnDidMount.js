import {
  compose,
  lifecycle,
} from 'recompose';
import { LoggingService } from '../../services';

const enhancer = screenName => compose(
  lifecycle({
    componentDidMount() {
      LoggingService.screen(screenName);
    },
  }),
);

export default enhancer;
