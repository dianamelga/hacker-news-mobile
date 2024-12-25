import { NOTIFICATION_PREFERENCES } from '@/constants/async-storage-keys';
import { TOPICS, ALL_TOPICS } from '@/constants/default-topics';
import { NotificationPreference } from '@/models/notification-preference';
import { BackgroundTaskService } from '@/services/background-task-service';
import { loadLocalData, saveLocalData } from '@/utils/storage';
import { useState, useEffect, useCallback } from 'react';

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
            notificationsEnabled: topic !== ALL_TOPICS,
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
  const togglePreference = useCallback(
    async (preference: NotificationPreference) => {
      const updatedPreferences = notificationPrefs.map((item) =>
        item === preference || preference.topic === ALL_TOPICS
          ? { ...item, notificationsEnabled: !item.notificationsEnabled }
          : item,
      );

      setNotificationPrefs(updatedPreferences);

      await saveLocalData<NotificationPreference[]>(
        NOTIFICATION_PREFERENCES,
        updatedPreferences,
      );
    },
    [notificationPrefs],
  );

  const notifyAboutNewArticles = useCallback(() => {
    BackgroundTaskService.testNotification();
  }, []);

  return { notificationPrefs, togglePreference, notifyAboutNewArticles };
};
