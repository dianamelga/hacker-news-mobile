import { StyleSheet } from 'react-native';
import { themeColors } from './colors';

const typography = StyleSheet.create({
  body: {
    color: themeColors.text,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  button: {
    color: themeColors.background,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16, // Button text color (e.g., on a primary background)
  },
  caption: {
    color: themeColors.subtleText,
    fontFamily: 'Nunito-Light',
    fontSize: 12,
  },
  heading1: {
    color: themeColors.text,
    fontFamily: 'Nunito-Bold',
    fontSize: 24, // Dynamically apply text color
  },
  heading2: {
    color: themeColors.text,
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading3: {
    color: themeColors.text,
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default typography;
