import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color.hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export type ThemedViewProps = ViewProps & {
  testID?: string;
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
};

export function ThemedView({
  testID = 'themed-view',
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
    <View
      testID={testID}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  ) : (
    <SafeAreaView
      testID={testID}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
