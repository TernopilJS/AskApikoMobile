import { createFactory, Component } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

const withRef = (
  getRefName,
  refChangeName,
) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);
  class WithRef extends Component {
    constructor(props, context) {
      super(props, context);

      this.ref = null;

      this.setRef = this.setRef.bind(this);
    }

    setRef(ref) {
      this.ref = ref;
    }

    render() {
      return factory({
        ...this.props,
        [getRefName]: () => this.ref,
        [refChangeName]: this.setRef,
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'WithRef'))(WithRef);
  }
  return WithRef;
};

export default withRef;
