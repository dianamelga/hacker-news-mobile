import { StyleSheet } from 'react-native';
import { themeColors } from './colors';

const COMMON_BUTTON_STYLE = {
  borderRadius: 30,
  paddingVertical: 8,
};

const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: themeColors.primary,
    ...COMMON_BUTTON_STYLE,
  },
  primaryButtonLabel: {
    color: themeColors.background,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: themeColors.primary,
    borderWidth: 1,
    ...COMMON_BUTTON_STYLE,
  },
  secondaryButtonLabel: {
    color: themeColors.primary,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
});

export default buttonStyles;
