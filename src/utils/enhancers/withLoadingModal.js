import React, { createFactory } from 'react';
import { View } from 'react-native';
import { LoadingModal } from '../../components';

const styles = {
  flex: 1,
};

export const stateChangeFunction =
  (stateChangeFunctionName, initialValue = false, loadingText) =>
    (BaseComponent) => {
      const factory = createFactory(BaseComponent);

      class WithLoadingModal extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
            showModal: initialValue,
          };

          this[stateChangeFunctionName] = this[stateChangeFunctionName].bind(this);
        }

        [stateChangeFunctionName](showModal) {
          this.setState({ showModal });
        }

        render() {
          const Component = factory({
            ...this.props,
            [stateChangeFunctionName]: this[stateChangeFunctionName],
          });

          return (
            <View style={styles}>
              {Component}
              <LoadingModal
                isVisible={this.state.showModal}
                loadingText={loadingText}
              />
            </View>
          );
        }
      }

      return WithLoadingModal;
    };

export const stateProp =
  (statePropName, loadingText) =>
    BaseComponent =>
      props => (
        <View style={styles}>
          <BaseComponent {...props} />
          <LoadingModal
            isVisible={props[statePropName]}
            loadingText={loadingText}
          />
        </View>
      );
