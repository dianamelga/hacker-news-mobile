import buttonStyles from '@/styles/buttons';
import React from 'react';
import { Button } from 'react-native-paper';

type ButtonProps = React.ComponentProps<typeof Button>;

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Button
      mode="contained"
      style={[buttonStyles.primaryButton, style]}
      labelStyle={buttonStyles.primaryButtonLabel}
      {...props}
    >
      {children}
    </Button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Button
      mode="outlined"
      style={[buttonStyles.secondaryButton, style]}
      labelStyle={buttonStyles.secondaryButtonLabel}
      {...props}
    >
      {children}
    </Button>
  );
};
