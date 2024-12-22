import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color.hook';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeArea = true,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return !safeArea ? (
    <View style={[{ backgroundColor }, style]} {...otherProps} />
  ) : (
    <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
