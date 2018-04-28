import { branch, renderComponent } from 'recompose';
import { RootSpinner } from '../../components';

const spinnerWhileLoading = isLoading => branch(
  isLoading,
  renderComponent(RootSpinner),
);

export default spinnerWhileLoading;
