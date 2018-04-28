import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Animated,
  Keyboard,
  View,
  ViewPropTypes,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Touchable, Icon } from '../../../components';
import { colors, fontWeights } from '../../../styles';
import { STATUSBAR_HEIGHT, APPBAR_HEIGHT } from '../../../constants';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const containerHeight = APPBAR_HEIGHT;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      showClearButton: false,
    };

    /**
    * functions
    */
    this.onFocus = this.onFocus.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.focus = this.focus.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.setRef = this.setRef.bind(this);

    /**
    * local variables
    */
    this.placeholder = this.props.placeholder || 'Search';
    this.cancelTitle = this.props.cancelTitle || 'Cancel';
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.onChangeText(nextProps.text || '');
    }
  }


    onLayout = (event) => {
      const contentWidth = event.nativeEvent.layout.width;
      this.contentWidth = contentWidth;
      this.middleWidth = contentWidth / 2;
    };

    /**
     * onSearch
     * async await
     */
    onSearch = async () => {
      this.props.beforeSearch && await this.props.beforeSearch(this.state.keyword);
      if (this.props.keyboardShouldPersist === false) {
        await Keyboard.dismiss();
      }

      this.props.onSearch && this.props.onSearch(this.state.keyword);
      this.props.afterSearch && await this.props.afterSearch(this.state.keyword);
    };

    /**
     * onChangeText
     * async await
     */
    onChangeText = async (text) => {
      this.setState((text.length > 0)
        ? { keyword: text, showClearButton: true }
        : { keyword: text, showClearButton: false },
      );
      this.props.onChangeText && this.props.onChangeText(text);
    };

    /**
     * onFocus
     * async await
     */
    onFocus = async () => {
      this.props.beforeFocus && await this.props.beforeFocus();
      if (this.props.onPress) {
        this.textInputRef._component.blur();
        this.props.onPress();
        return;
      }

      this.textInputRef._component.isFocused && await this.textInputRef._component.focus();
      this.props.onFocus && await this.props.onFocus(this.state.keyword);
      this.props.afterFocus && await this.props.afterFocus();
    };

    /**
     * focus
     * async await
     */
    focus = async (text = '') => {
      await this.setState({ keyword: text });
      await this.textInputRef._component.focus();
    };

    blur = async () => {
      await this.textInputRef._component.blur();
    };

    /**
     * onDelete
     * async await
     */
    onDelete = async () => {
      this.props.beforeDelete && await this.props.beforeDelete();
      this.setState({ keyword: '' });
      this.onChangeText('');
      this.props.onDelete && await this.props.onDelete();
      this.props.afterDelete && await this.props.afterDelete();
    };

    /**
     * onCancel
     * async await
     */
    onCancel = async () => {
      this.props.beforeCancel && await this.props.beforeCancel();
      await this.setState({ keyword: '' });
      await this.onChangeText('');
      this.props.onCancel && this.props.onCancel();
      this.props.afterCancel && await this.props.afterCancel();
    };

    setRef(ref) {
      if (!ref) {
        return;
      }

      this.textInputRef = ref;

      if (this.props.getRef) {
        this.props.getRef(ref._component);
      }
    }

    render() {
      const { keyword, showClearButton } = this.state;

      const showPlaceholder = keyword.length === 0;
      return (
        <View
          style={[
            styles.container,
            this.props.backgroundColor && { backgroundColor: this.props.backgroundColor },
          ]}
          onLayout={this.onLayout}
        >
          <Touchable
            onPress={this.props.dismiss}
            borderless
            rippleColor={colors.navHeader.rippleColor}
          >
            <View >
              <Icon
                size={24}
                color={colors.navHeader.tint}
                IconSet={MaterialIcons}
                iconName="arrow-back"
                iconStyle={styles.leftIcon}
              />
            </View>
          </Touchable>

          <AnimatedTextInput
            ref={this.setRef}
            style={[
              styles.input,
              this.props.placeholderTextColor
                && showPlaceholder && { color: this.props.placeholderTextColor },
              this.props.inputStyle && this.props.inputStyle,
              this.props.inputHeight && { height: this.props.inputHeight },
              this.props.inputBorderRadius && { borderRadius: this.props.inputBorderRadius },
              this.props.height && { height: this.props.height },
            ]}
            editable={this.props.editable}
            value={this.state.keyword}
            onKeyPress={this.props.onKeyPress}
            onChangeText={this.onChangeText}
            multiline={false}
            placeholder={this.placeholder}
            placeholderTextColor={this.props.placeholderTextColor || styles.placeholderColor}
            onSubmitEditing={this.props.onSubmitEditing}
            autoCorrect={false}
            blurOnSubmit={this.props.blurOnSubmit}
            returnKeyType={this.props.returnKeyType || 'search'}
            keyboardType={this.props.keyboardType || 'default'}
            autoCapitalize={this.props.autoCapitalize}
            onFocus={this.onFocus}
            underlineColorAndroid={colors.searchBox.underlineAndroid}
          />

          {showClearButton && (
            <Touchable
              onPress={this.onDelete}
              borderless
              rippleColor={colors.navHeader.rippleColor}
            >
              <View style={styles.clearContainer}>
                <Icon
                  size={16}
                  color={colors.navHeader.tint}
                  IconSet={MaterialIcons}
                  iconName="clear"
                  iconStyle={styles.clearIcon}
                />
              </View>
            </Touchable>
          )}
        </View>
      );
    }
}

const styles = {
  container: {
    backgroundColor: colors.searchBox.inputContainer,
    minHeight: containerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: STATUSBAR_HEIGHT,
  },
  input: {
    height: 28,
    alignSelf: 'center',
    textAlign: 'left',
    marginHorizontal: 16,
    flex: 1,
    fontSize: 20,
    fontWeight: fontWeights.normal,
    color: colors.searchBox.inputText,
  },
  placeholderColor: colors.searchBox.placeholderText,
  leftIcon: {
    height: 24,
    width: 24,
    margin: 16,
  },
  clearContainer: {
    marginRight: 8,
  },
  clearIcon: {
    height: 16,
    width: 16,
    margin: 8,
  },
};
/**
 * Props
 */
Search.propTypes = {
  /**
  * onFocus
  * return a Promise
  * beforeFocus, onFocus, afterFocus
  */
  beforeFocus: PropTypes.func,
  onFocus: PropTypes.func,
  afterFocus: PropTypes.func,

  /**
  * onSearch
  * return a Promise
  */
  beforeSearch: PropTypes.func,
  onSearch: PropTypes.func,
  afterSearch: PropTypes.func,

  /**
  * onChangeText
  * return a Promise
  */
  onChangeText: PropTypes.func,

  /**
  * onCancel
  * return a Promise
  */
  beforeCancel: PropTypes.func,
  onCancel: PropTypes.func,
  afterCancel: PropTypes.func,

  /**
  * async await
  * return a Promise
  * beforeDelete, onDelete, afterDelete
  */
  beforeDelete: PropTypes.func,
  onDelete: PropTypes.func,
  afterDelete: PropTypes.func,

  /**
  * styles
  */
  backgroundColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  titleCancelColor: PropTypes.string,
  tintColorSearch: PropTypes.string,
  tintColorDelete: PropTypes.string,
  inputStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    ViewPropTypes.style,
  ]),
  cancelButtonStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  onLayout: PropTypes.func,

  /**
  * text input
  */
  placeholder: PropTypes.string,
  cancelTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  iconDelete: PropTypes.any,
  iconSearch: PropTypes.any,
  returnKeyType: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  inputHeight: PropTypes.number,
  inputBorderRadius: PropTypes.number,
  contentWidth: PropTypes.number,
  middleWidth: PropTypes.number,
  editable: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  keyboardShouldPersist: PropTypes.bool,
};

Search.defaultProps = {
  editable: true,
  blurOnSubmit: false,
  keyboardShouldPersist: false,
};

export default Search;
