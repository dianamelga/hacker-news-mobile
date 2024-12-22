import { NOTIFICATION_PREFERENCES } from '@/constants/async-storage-keys';
import { loadLocalData, saveLocalData } from '@/utils/storage';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

export interface PreferencesContextProps {
  preferences: string[];
  savePreferences: (preferences: string[]) => void;
}

export const PreferencesContext = createContext<
  PreferencesContextProps | undefined
>(undefined);

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<string[]>([]);

  const loadLocalPrefs = async () => {
    setPreferences(
      (await loadLocalData<string[]>(NOTIFICATION_PREFERENCES)) || [],
    );
  };

  useEffect(() => {
    loadLocalPrefs();
  }, []);

  const savePreferences = async (preferences: string[]) => {
    await saveLocalData<string[]>(NOTIFICATION_PREFERENCES, preferences);
    setPreferences(preferences);
  };

  return (
    <PreferencesContext.Provider value={{ preferences, savePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};
