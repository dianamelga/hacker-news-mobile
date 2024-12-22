import {
  PreferencesContext,
  PreferencesContextProps,
} from '@/context/preferences-context';
import { useContext } from 'react';

export const usePreferences = (): PreferencesContextProps => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
