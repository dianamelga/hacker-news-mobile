import { Appearance } from 'react-native';

const lightColors = {
    primary: '#FF3A44',    // Primary color
    secondary: '#0080FF',  // Secondary color
    tertiary: '#FFE600',   // Tertiary color
    background: '#FFFFFF', // Light background
    text: '#000000',       // Black for text
    subtleText: '#A0A0A0', // Gray for subtle text
    border: '#E0E0E0',     // Light gray for borders
    error: '#FF3A44',
};

const darkColors = {
    primary: '#FF3A44',    // Primary color
    secondary: '#0080FF',  // Secondary color
    tertiary: '#FFE600',   // Tertiary color
    background: '#121212', // Dark background
    text: '#FFFFFF',       // White for text
    subtleText: '#A0A0A0', // Gray for subtle text
    border: '#333333',     // Dark gray for borders
    error: '#FF3A44',
};

const colors = {
    light: lightColors,
    dark: darkColors,
};

const colorScheme = Appearance.getColorScheme(); // 'light' or 'dark'
const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

export { colors, themeColors };

