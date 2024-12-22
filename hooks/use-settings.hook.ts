import { NOTIFICATION_PREFERENCES } from '@/constants/async-storage-keys';
import { NotificationPreference } from '@/models/notification-preference';
import { loadLocalData, saveLocalData } from '@/utils/storage';
import { useState, useEffect } from 'react';

const TOPICS = ['facebook', 'android', 'ios', 'apple', 'google'];

export const useSettingsScreen = () => {
  const [notificationPrefs, setNotificationPrefs] = useState<
    NotificationPreference[]
  >([]);

  useEffect(() => {
    const loadPreferences = async () => {
      const savedPreferences = await loadLocalData<NotificationPreference[]>(
        NOTIFICATION_PREFERENCES,
      );

      if (savedPreferences) {
        setNotificationPrefs(savedPreferences);
      } else {
        // Initialize preferences with all topics enabled by default
        const defaultPreferences: NotificationPreference[] = TOPICS.map(
          (topic) => ({
            topic: topic,
            notificationsEnabled: true,
          }),
        );

        setNotificationPrefs(defaultPreferences);

        await saveLocalData<NotificationPreference[]>(
          NOTIFICATION_PREFERENCES,
          defaultPreferences,
        );
      }
    };
    loadPreferences();
  }, []);

  // Toggle preference and persist to storage
  const togglePreference = async (preference: NotificationPreference) => {
    const updatedPreferences = notificationPrefs.map((item) =>
      item === preference
        ? { ...item, notificationsEnabled: !item.notificationsEnabled }
        : item,
    );

    setNotificationPrefs(updatedPreferences);

    await saveLocalData<NotificationPreference[]>(
      NOTIFICATION_PREFERENCES,
      updatedPreferences,
    );
  };

  return { notificationPrefs, togglePreference };
};
