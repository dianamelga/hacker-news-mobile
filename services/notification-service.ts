import { PUSH_NOTIFICATION_TOKEN } from '@/constants/async-storage-keys';
import * as Notifications from 'expo-notifications';
import {
  sendPushNotification,
  registerForPushNotificationsAsync,
  addNotificationOpenedListener,
} from '@/utils/push-notifications';
import { loadLocalData, saveLocalData } from '@/utils/storage';

export const NotificationService = {
  sendNotification: async (title: string, body: string) => {
    const pushToken = await loadLocalData<string>(PUSH_NOTIFICATION_TOKEN);
    if (!pushToken) {
      console.warn('No push token available');
      return;
    }
    try {
      await sendPushNotification(pushToken, { title, body });
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  },

  registerForPushNotifications: async () => {
    try {
      const token = await registerForPushNotificationsAsync();
      if (!token) {
        console.warn('Failed to get push notification token');
        return null;
      }
      console.log('Push notification token registered:', token);
      await saveLocalData<string>(PUSH_NOTIFICATION_TOKEN, token);
    } catch (error) {
      console.error('Failed to register for push notifications:', error);
      return null;
    }
  },

  addNotificationOpenedListener(
    listener: (response: Notifications.NotificationResponse) => void,
  ) {
    addNotificationOpenedListener(listener);
  },
};
