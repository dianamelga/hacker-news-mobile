import { PUSH_NOTIFICATION_TOKEN } from '@/constants/async-storage-keys';
import {
  sendPushNotification,
  registerForPushNotificationsAsync,
} from '@/utils/push-notification-utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotificationService = {
  sendNotification: async (title: string, body: string) => {
    const pushToken = await AsyncStorage.getItem(PUSH_NOTIFICATION_TOKEN);
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
      await AsyncStorage.setItem(PUSH_NOTIFICATION_TOKEN, token);
    } catch (error) {
      console.error('Failed to register for push notifications:', error);
      return null;
    }
  },
};
