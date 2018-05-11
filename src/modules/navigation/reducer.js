import { RootNavigator } from '../../navigation';

const navReducer = (state, action) => {
  switch (action.type) {
    default: {
      const newState = RootNavigator.router.getStateForAction(action, state);
      return (newState || state);
    }
  }
};

export default navReducer;
