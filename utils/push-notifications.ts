import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync(): Promise<string> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      throw new Error(
        'Permission not granted to get push token for push notification!',
      );
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);

      return pushTokenString;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  } else {
    throw new Error('Must use physical device for push notifications');
  }
}

export async function sendPushNotification(
  expoPushToken: string,
  { title, body }: { title: string; body: string },
) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function addNotificationOpenedListener(
  listener: (notification: Notifications.Notification) => void,
) {
  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('🎉 Notification Opened: ', response.notification);
    listener(response.notification);
  });
  Notifications.addNotificationReceivedListener((notification) => {
    if (Platform.OS === 'android') {
      // force to present the notification on foreground only for android, iOS already presents it by default
      console.log('🔔 Notification Received: ', notification);
      Notifications.presentNotificationAsync({
        title: notification.request.content.title,
        body: notification.request.content.body,
        data: notification.request.content.data,
      });
    }
  });
}
