import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  Image,
  View,
  ViewPropTypes,
} from 'react-native';
import { Touchable } from '../../../components';
import { ANIMATION_DURATION } from '../../../constants';
import { colors, fontWeights } from '../../../styles';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const containerHeight = 46;
const middleHeight = 22;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      expanded: !!this.props.autoFocus,
    };
    const { width } = Dimensions.get('window');
    this.contentWidth = props.paddingHorizontal ? width - (props.paddingHorizontal * 2) : width;
    this.middleWidth = this.contentWidth / 2;
    this.topPadding = this.props.topPadding || 20;
    this.initialTopPadding = this.props.initialTopPadding || 0;

    /**
         * Animated values
         */
    this.iconSearchAnimated = new Animated.Value(this.middleWidth - this.props.searchIconCollapsedMargin);
    this.iconDeleteAnimated = new Animated.Value(0);
    this.inputFocusWidthAnimated = new Animated.Value(this.contentWidth - 17);
    this.inputFocusPlaceholderAnimated = new Animated.Value(this.middleWidth - this.props.placeholderCollapsedMargin);
    this.btnCancelAnimated = new Animated.Value(this.contentWidth);
    this.topPaddingAnimated = new Animated.Value(this.initialTopPadding);

    /**
         * functions
         */
    this.onFocus = this.onFocus.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.focus = this.focus.bind(this);
    this.expandAnimation = this.expandAnimation.bind(this);
    this.collapseAnimation = this.collapseAnimation.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.setRef = this.setRef.bind(this);

    /**
         * local variables
         */
    this.placeholder = this.props.placeholder || 'Search';
    this.cancelTitle = this.props.cancelTitle || 'Cancel';

    /**
         * Shadow
         */
    this.shadowOpacityAnimated = new Animated.Value(this.props.shadowOpacityCollapsed);
    this.shadowHeight = this.props.shadowOffsetHeightCollapsed;
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
      if (this.state.expanded) {
        this.expandAnimation();
      } else {
        this.collapseAnimation();
      }
    }

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
    }

    /**
     * onChangeText
     * async await
     */
    onChangeText = async (text) => {
      this.setState({ keyword: text });
      Animated.timing(
        this.iconDeleteAnimated,
        {
          toValue: (text.length > 0) ? 1 : 0,
          duration: 100,
        },
      ).start();
      this.props.onChangeText && this.props.onChangeText(text);
    }

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
      await this.setState(prevState => ({ expanded: !prevState.expanded }));
      await this.expandAnimation();
      this.props.onFocus && await this.props.onFocus(this.state.keyword);
      this.props.afterFocus && await this.props.afterFocus();
    }

    /**
     * focus
     * async await
     */
    focus = async (text = '') => {
      await this.setState({ keyword: text });
      await this.textInputRef._component.focus();
    }

    blur = async () => {
      await this.textInputRef._component.blur();
    }

    /**
     * onDelete
     * async await
     */
    onDelete = async () => {
      this.props.beforeDelete && await this.props.beforeDelete();
      Animated.timing(
        this.iconDeleteAnimated,
        {
          toValue: 0,
          duration: 100,
        },
      ).start();
      this.setState({ keyword: '' });
      this.onChangeText('');
      this.props.onDelete && await this.props.onDelete();
      this.props.afterDelete && await this.props.afterDelete();
    }

    /**
     * onCancel
     * async await
     */
    onCancel = async () => {
      this.props.beforeCancel && await this.props.beforeCancel();
      await this.setState({ keyword: '' });
      await this.setState(prevState => ({ expanded: !prevState.expanded }));
      await this.collapseAnimation(true);
      await this.onChangeText('');
      this.props.onCancel && this.props.onCancel();
      this.props.afterCancel && await this.props.afterCancel();
    }

    setRef(ref) {
      if (!ref) {
        return;
      }

      this.textInputRef = ref;

      if (this.props.getRef) {
        this.props.getRef(ref._component);
      }
    }

    expandAnimation = () => {
      const { noPadding, noCancel } = this.props;
      return new Promise((resolve, reject) => {
        Animated.parallel([
          (noPadding ? Promise.resolve() : Animated.timing(
            this.topPaddingAnimated,
            {
              toValue: this.topPadding,
              duration: ANIMATION_DURATION,
            },
          ).start()),
          (noCancel ? null : Animated.timing(
            this.inputFocusWidthAnimated,
            {
              toValue: this.contentWidth - 82,
              duration: ANIMATION_DURATION,
            },
          ).start()),
          (noCancel ? null : Animated.timing(
            this.btnCancelAnimated,
            {
              toValue: 10,
              duration: ANIMATION_DURATION,
            },
          ).start()),
          Animated.timing(
            this.inputFocusPlaceholderAnimated,
            {
              toValue: this.props.placeholderExpandedMargin,
              duration: ANIMATION_DURATION,
            },
          ).start(),
          Animated.timing(
            this.iconSearchAnimated,
            {
              toValue: this.props.searchIconExpandedMargin,
              duration: ANIMATION_DURATION,
            },
          ).start(),
          Animated.timing(
            this.iconDeleteAnimated,
            {
              toValue: (this.state.keyword.length > 0) ? 1 : 0,
              duration: ANIMATION_DURATION,
            },
          ).start(),
          Animated.timing(
            this.shadowOpacityAnimated,
            {
              toValue: this.props.shadowOpacityExpanded,
              duration: ANIMATION_DURATION,
            },
          ).start(),
        ]);
        this.shadowHeight = this.props.shadowOffsetHeightExpanded;
        resolve();
      });
    }

    collapseAnimation = (isForceAnim = false) => {
      const { noPadding, noCancel } = this.props;
      return new Promise((resolve, reject) => {
        Animated.parallel([
          ((this.props.keyboardShouldPersist === false) ? Keyboard.dismiss() : null),
          (noCancel ? null : Animated.timing(
            this.inputFocusWidthAnimated,
            {
              toValue: this.contentWidth - 17,
              duration: ANIMATION_DURATION,
            },
          ).start()),
          (noPadding ? Promise.resolve() : Animated.timing(
            this.topPaddingAnimated,
            {
              toValue: this.initialTopPadding,
              duration: ANIMATION_DURATION,
            },
          ).start()),
          (noCancel ? null : Animated.timing(
            this.btnCancelAnimated,
            {
              toValue: this.contentWidth,
              duration: ANIMATION_DURATION,
            },
          ).start()),
          ((this.props.keyboardShouldPersist === false) ?
            Animated.timing(
              this.inputFocusPlaceholderAnimated,
              {
                toValue: this.middleWidth - this.props.placeholderCollapsedMargin,
                duration: ANIMATION_DURATION,
              },
            ).start() : null),
          ((this.props.keyboardShouldPersist === false || isForceAnim === true) ?
            Animated.timing(
              this.iconSearchAnimated,
              {
                toValue: this.middleWidth - this.props.searchIconCollapsedMargin,
                duration: ANIMATION_DURATION,
              },
            ).start() : null),
          Animated.timing(
            this.iconDeleteAnimated,
            {
              toValue: 0,
              duration: ANIMATION_DURATION,
            },
          ).start(),
          Animated.timing(
            this.shadowOpacityAnimated,
            {
              toValue: this.props.shadowOpacityCollapsed,
              duration: ANIMATION_DURATION,
            },
          ).start(),
        ]);
        this.shadowHeight = this.props.shadowOffsetHeightCollapsed;
        resolve();
      });
    }

    render() {
      const { keyword } = this.state;

      const showPlaceholder = keyword.length === 0;
      return (
        <Animated.View
          style={[
            this.props.backgroundColor && { backgroundColor: this.props.backgroundColor },
            { marginTop: this.topPaddingAnimated },
          ]}
        >
          <Animated.View
            ref="searchContainer"
            style={[
              styles.container,
              this.props.backgroundColor && { backgroundColor: this.props.backgroundColor },
            ]}
            onLayout={this.onLayout}
          >
            <AnimatedTextInput
              ref={this.setRef}
              style={[
                styles.input,
                this.props.placeholderTextColor && showPlaceholder && { color: this.props.placeholderTextColor },
                this.props.inputStyle && this.props.inputStyle,
                this.props.inputHeight && { height: this.props.inputHeight },
                this.props.inputBorderRadius && { borderRadius: this.props.inputBorderRadius },
                {
                  width: this.inputFocusWidthAnimated,
                  paddingLeft: this.props.searchPosition ? this.props.searchPosition + 12 : this.inputFocusPlaceholderAnimated,
                  paddingRight: 16,
                },
                this.props.shadowVisible && {
                  shadowOffset: { width: this.props.shadowOffsetWidth, height: this.shadowHeight },
                  shadowColor: this.props.shadowColor,
                  shadowOpacity: this.shadowOpacityAnimated,
                  shadowRadius: this.props.shadowRadius,
                },
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
            <TouchableWithoutFeedback onPress={this.onFocus}>
              {((this.props.iconSearch) ? (
                <Animated.Image
                  source={this.props.iconSearch}
                  style={[
                    styles.iconSearch,
                    styles.iconSearchDefault,
                    this.props.tintColorSearch && { tintColor: this.props.tintColorSearch },
                    {
                      left: this.props.searchPosition ? this.props.searchPosition : this.iconSearchAnimated,
                    },
                  ]}
                />
              ) : (
                <Animated.Image
                  source={require('../img/search.png')}
                  style={[
                    styles.iconSearch,
                    styles.iconSearchDefault,
                    this.props.tintColorSearch && { tintColor: this.props.tintColorSearch },
                    {
                      left: this.props.searchPosition ? this.props.searchPosition : this.iconSearchAnimated,
                    },
                  ]}
                />
            ))}
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onDelete}>
              {((this.props.iconDelete) ? (
                <Animated.View
                  style={[
                    styles.iconDelete,
                    this.props.positionRightDelete && { right: this.props.positionRightDelete },
                    { opacity: this.iconDeleteAnimated },
                  ]}
                >
                  {this.props.iconDelete}
                </Animated.View>
              ) : (
                <Animated.Image
                  source={require('../img/delete.png')}
                  style={[
                    styles.iconDelete,
                    styles.iconDeleteDefault,
                    this.props.tintColorDelete && { tintColor: this.props.tintColorDelete },
                    this.props.positionRightDelete && { right: this.props.positionRightDelete },
                    { opacity: this.iconDeleteAnimated },
                  ]}
                />
            ))}
            </TouchableWithoutFeedback>
            <Touchable onPress={this.onCancel} useOpacity>
              <Animated.View
                style={[
                  styles.cancelButton,
                  this.props.cancelButtonStyle && this.props.cancelButtonStyle,
                  { left: this.btnCancelAnimated },
                ]}
              >
                <Text style={[
                    styles.cancelButtonText,
                    this.props.titleCancelColor && { color: this.props.titleCancelColor },
                    this.props.cancelButtonStyle && this.props.cancelButtonStyle,
                  ]}
                >
                  {this.cancelTitle}
                </Text>
              </Animated.View>
            </Touchable>
          </Animated.View>
        </Animated.View>
      );
    }
}

const styles = {
  container: {
    backgroundColor: colors.searchBox.inputContainer,
    minHeight: containerHeight,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 8,
    // paddingRight: 8,
  },
  input: {
    height: 28,
    alignSelf: 'center',
    // paddingTop: 5,
    // paddingBottom: 5,
    // paddingRight: 20,
    borderColor: colors.searchBox.inputBorder,
    backgroundColor: colors.searchBox.inputBackground,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: fontWeights.normal,
    color: colors.searchBox.inputText,
  },
  placeholderColor: colors.searchBox.placeholderText,
  iconSearch: {
    flex: 1,
    position: 'absolute',
    top: middleHeight - 6,
    height: 14,
    width: 14,
  },
  iconSearchDefault: {
    tintColor: colors.searchBox.defaultSearchIcon,
  },
  iconDelete: {
    position: 'absolute',
    right: 80,
    top: middleHeight - 5,
    height: 14,
    width: 14,
  },
  iconDeleteDefault: {
    tintColor: colors.searchBox.defaultDeleteIcon,
  },
  cancelButton: {
    justifyContent: 'center',
    backgroundColor: colors.searchBox.cancelButtonBackground,
    width: 72 - 10,
    height: 40,
  },
  cancelButtonText: {
    fontSize: 17,
    color: colors.searchBox.cancelButtonText,
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
  cancelButtonStyle: ViewPropTypes.style,

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

  /**
     * Positioning
     */
  positionRightDelete: PropTypes.number,
  searchIconCollapsedMargin: PropTypes.number,
  searchIconExpandedMargin: PropTypes.number,
  placeholderCollapsedMargin: PropTypes.number,
  placeholderExpandedMargin: PropTypes.number,

  /**
     * Shadow
     */
  shadowOffsetHeightCollapsed: PropTypes.number,
  shadowOffsetHeightExpanded: PropTypes.number,
  shadowOffsetWidth: PropTypes.number,
  shadowColor: PropTypes.string,
  shadowOpacityCollapsed: PropTypes.number,
  shadowOpacityExpanded: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowVisible: PropTypes.bool,
};

Search.defaultProps = {
  editable: true,
  blurOnSubmit: false,
  keyboardShouldPersist: false,
  searchIconCollapsedMargin: 28,
  searchIconExpandedMargin: 12,
  placeholderCollapsedMargin: 16,
  placeholderExpandedMargin: 22,
  shadowOffsetWidth: 0,
  shadowOffsetHeightCollapsed: 2,
  shadowOffsetHeightExpanded: 4,
  shadowColor: '#000',
  shadowOpacityCollapsed: 0.12,
  shadowOpacityExpanded: 0.24,
  shadowRadius: 4,
  shadowVisible: false,
};

export default Search;
