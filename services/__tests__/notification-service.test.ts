import { NotificationService } from '@/services/notification-service';
import { PUSH_NOTIFICATION_TOKEN } from '@/constants/async-storage-keys';

jest.mock('@/utils/push-notifications', () => ({
  sendPushNotification: jest.fn(),
  registerForPushNotificationsAsync: jest.fn(),
  addNotificationOpenedListener: jest.fn(),
}));

jest.mock('@/utils/storage', () => ({
  loadLocalData: jest.fn(),
  saveLocalData: jest.fn(),
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('NotificationService', () => {
  describe('sendNotification', () => {
    it('should send notification if push token is available', async () => {
      const pushToken = 'valid-token';

      jest
        .spyOn(require('@/utils/storage'), 'loadLocalData')
        .mockResolvedValue(pushToken);

      const mockSendPushNotification = jest
        .spyOn(require('@/utils/push-notifications'), 'sendPushNotification')
        .mockResolvedValue(undefined);

      await NotificationService.sendNotification('Test Title', 'Test Body');

      expect(mockSendPushNotification).toHaveBeenCalledWith(pushToken, {
        title: 'Test Title',
        body: 'Test Body',
      });
    });

    it('should not send notification if no push token is available', async () => {
      jest
        .spyOn(require('@/utils/storage'), 'loadLocalData')
        .mockResolvedValue(null);

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      await NotificationService.sendNotification('Test Title', 'Test Body');

      expect(consoleWarnSpy).toHaveBeenCalledWith('No push token available');

      consoleWarnSpy.mockRestore();
    });

    it('should log error if sending notification fails', async () => {
      const pushToken = 'valid-token';

      const mockSendPushNotification = jest
        .fn()
        .mockRejectedValue(new Error('Network Error'));

      jest
        .spyOn(require('@/utils/storage'), 'loadLocalData')
        .mockResolvedValue(pushToken);

      jest
        .spyOn(require('@/utils/push-notifications'), 'sendPushNotification')
        .mockImplementation(mockSendPushNotification);

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await NotificationService.sendNotification('Test Title', 'Test Body');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to send push notification:',
        expect.any(Error),
      );
    });
  });

  describe('registerForPushNotifications', () => {
    it('should register for push notifications and save token', async () => {
      const token = 'new-token';
      const mockRegisterForPushNotificationsAsync = jest
        .fn()
        .mockResolvedValue(token);

      const mockSaveLocalData = jest
        .fn()
        .mockImplementation((_key: string, _value: string) => {});

      jest
        .spyOn(
          require('@/utils/push-notifications'),
          'registerForPushNotificationsAsync',
        )
        .mockImplementation(mockRegisterForPushNotificationsAsync);

      jest
        .spyOn(require('@/utils/storage'), 'saveLocalData')
        .mockImplementation(mockSaveLocalData);

      await NotificationService.registerForPushNotifications();

      expect(mockSaveLocalData).toHaveBeenCalledWith(
        PUSH_NOTIFICATION_TOKEN,
        token,
      );
    });

    it('should log a warning if token is not available', async () => {
      const mockRegisterForPushNotificationsAsync = jest
        .fn()
        .mockResolvedValue(null);
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      jest
        .spyOn(
          require('@/utils/push-notifications'),
          'registerForPushNotificationsAsync',
        )
        .mockImplementation(mockRegisterForPushNotificationsAsync);

      await NotificationService.registerForPushNotifications();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Failed to get push notification token',
      );
    });

    it('should log error if registration fails', async () => {
      const mockRegisterForPushNotificationsAsync = jest
        .fn()
        .mockRejectedValue(new Error('Registration Error'));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      jest
        .spyOn(
          require('@/utils/push-notifications'),
          'registerForPushNotificationsAsync',
        )
        .mockImplementation(mockRegisterForPushNotificationsAsync);

      await NotificationService.registerForPushNotifications();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to register for push notifications:',
        expect.any(Error),
      );
    });
  });

  describe('addNotificationOpenedListener', () => {
    it('should add a notification opened listener', () => {
      const mockListener = jest.fn();

      const addNotificationListenerSpy = jest.spyOn(
        require('@/utils/push-notifications'),
        'addNotificationOpenedListener',
      );

      NotificationService.addNotificationOpenedListener(mockListener);

      expect(addNotificationListenerSpy).toHaveBeenCalledWith(mockListener);
    });
  });
});
