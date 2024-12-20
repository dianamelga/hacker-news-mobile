import { StyleSheet } from 'react-native';
import { themeColors } from './colors';

const typography = StyleSheet.create({
    heading1: {
        fontFamily: 'Nunito-Bold',
        fontSize: 24,
        color: themeColors.text, // Dynamically apply text color
    },
    heading2: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
        color: themeColors.text,
    },
    body: {
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: themeColors.text,
    },
    caption: {
        fontFamily: 'Nunito-Light',
        fontSize: 12,
        color: themeColors.subtleText,
    },
    button: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        color: themeColors.background, // Button text color (e.g., on a primary background)
    },
});

export default typography;
