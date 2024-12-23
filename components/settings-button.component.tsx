import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native-gesture-handler';

export const SettingsButton = () => {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push('/settings');
  };

  return (
    <Pressable onPress={navigateToSettings}>
      <MaterialIcons name="settings" size={24} color="black" />
    </Pressable>
  );
};
