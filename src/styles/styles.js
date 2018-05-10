import { StyleSheet } from 'react-native';
import colors from './colors';
import dimensions from './dimensions';

const styles = StyleSheet.create({
  screenBg: {
    backgroundColor: colors.white,
  },
  fillAll: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withMarginBottom: {
    marginBottom: dimensions.indent,
  },
  withMarginTop: {
    marginTop: dimensions.indent,
  },
  withMarginLeft: {
    marginRight: dimensions.indent,
  },
  withMarginRight: {
    marginRight: dimensions.indent,
  },
  withPaddingLeft: {
    paddingLeft: dimensions.indent,
  },
  withPaddingRight: {
    paddingRight: dimensions.indent,
  },
  withVerticalMargin: {
    marginTop: dimensions.indent,
    marginBottom: dimensions.indent,
  },
  withVerticalPadding: {
    paddingTop: dimensions.indent,
    paddingBottom: dimensions.indent,
  },
  withHorizontalPadding: {
    paddingRight: dimensions.indent,
    paddingLeft: dimensions.indent,
  },
  withHorizontalMargin: {
    marginRight: dimensions.indent,
    marginLeft: dimensions.indent,
  },
  withoutMargins: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  withWhiteBackground: {
    backgroundColor: colors.white,
  },
  withGrayBackground: {
    backgroundColor: colors.grayBg,
  },
  withLightBackground: {
    backgroundColor: colors.athensGray,
  },
  withSecondaryTextColor: {
    color: colors.secondaryText,
  },
  withVerticalBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  stickToBottom: {
    bottom: 0,
  },
  stretchHorizontally: {
    left: 0,
    right: 0,
  },
  alignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  withoutBorders: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    shadowOpacity: 0,
  },
  withBorderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  withBorderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerBg: {
    backgroundColor: colors.headerBackgroundColorDefault,
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.headerBorderBottom,
  },
  borderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.headerBorderBottom,
  },
});

export default styles;
