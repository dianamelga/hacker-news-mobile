import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color.hook';
import typography from '@/styles/typography';
import React from 'react';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? typography.body : undefined,
        type === 'h1' ? typography.heading1 : undefined,
        type === 'h2' ? typography.heading2 : undefined,
        type === 'h3' ? typography.heading3 : undefined,
        type === 'body' ? typography.body : undefined,
        type === 'caption' ? typography.caption : undefined,
        type === 'button' ? typography.button : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
