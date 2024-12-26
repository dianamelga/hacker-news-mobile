import { BACKGROUND_FETCH_TASK } from './../../constants/async-storage-keys';
import { NotificationService } from '@/services/notification-service';
import { NotificationPreference } from '@/models/notification-preference';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { ALL_TOPICS } from '@/constants/default-topics';
import { BackgroundTaskService } from '@/services/background-task-service';
import { fetchArticles } from '@/services/hacker-news-api';
import { loadLocalData } from '@/utils/storage';

jest.mock('@/services/notification-service', () => ({
  NotificationService: {
    sendNotification: jest.fn(),
  },
}));

jest.mock('@/services/hacker-news-api', () => ({
  fetchArticles: jest.fn(),
}));
jest.mock('expo-background-fetch');
jest.mock('expo-task-manager');
jest.mock('@/utils/storage', () => ({
  loadLocalData: jest.fn(),
  saveLocalData: jest.fn(),
}));

describe('BackgroundTaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkForNewArticles', () => {
    it('should send a notification for new articles when preferences match', async () => {
      const mockArticles = [
        {
          story_title: 'New React Feature',
          story_url: 'http://example.com',
          created_at: '2024-12-25T00:00:00Z',
        },
      ];

      const mockPreferences = [
        { topic: 'react', notificationsEnabled: true },
        { topic: 'all', notificationsEnabled: true },
      ];

      (loadLocalData as jest.Mock).mockResolvedValueOnce(
        '2024-12-24T00:00:00Z',
      );
      (loadLocalData as jest.Mock).mockResolvedValueOnce(mockPreferences);
      (fetchArticles as jest.Mock).mockResolvedValueOnce(mockArticles);

      await BackgroundTaskService.checkForNewArticles();

      expect(NotificationService.sendNotification).toHaveBeenCalledWith(
        'New React Feature',
        'http://example.com',
      );
    });

    it('should not send a notification when no new articles match preferences', async () => {
      const mockArticles = [
        {
          story_title: 'Old React Feature',
          story_url: 'http://example.com',
          created_at: '2024-12-20T00:00:00Z',
        },
      ];
      const mockPreferences: NotificationPreference[] = [
        { topic: 'node', notificationsEnabled: true },
        { topic: ALL_TOPICS, notificationsEnabled: true },
      ];

      (loadLocalData as jest.Mock).mockResolvedValueOnce(
        '2024-12-25T00:00:00Z',
      ); // mock last check time
      (loadLocalData as jest.Mock).mockResolvedValueOnce(mockPreferences); // mock preferences
      (loadLocalData as jest.Mock).mockResolvedValueOnce(mockArticles); // mock fetchArticles API

      await BackgroundTaskService.checkForNewArticles();

      // Verify that NotificationService.sendNotification is not called
      expect(NotificationService.sendNotification).not.toHaveBeenCalled();
    });

    it('should log error when an exception is thrown', async () => {
      console.error = jest.fn(); // Mock console.error
      (fetchArticles as jest.Mock).mockRejectedValueOnce(
        new Error('Fetch failed'),
      );

      await BackgroundTaskService.checkForNewArticles();

      // Verify that the error was logged
      expect(console.error).toHaveBeenCalledWith(
        'Error checking for new articles:',
        expect.any(Error),
      );
    });
  });

  describe('defineBackgroundTask', () => {
    it('should define a background task', async () => {
      await BackgroundTaskService.defineBackgroundTask();

      // Check that TaskManager.defineTask is called with the correct task name and function
      expect(TaskManager.defineTask).toHaveBeenCalledWith(
        expect.anything(),
        expect.any(Function),
      );
    });
  });

  describe('registerBackgroundFetchAsync', () => {
    it('should register background fetch task', async () => {
      const registerMock = jest.fn().mockResolvedValue(undefined);

      jest
        .spyOn(BackgroundFetch, 'registerTaskAsync')
        .mockImplementation(registerMock);

      await BackgroundTaskService.registerBackgroundFetchAsync();

      expect(registerMock).toHaveBeenCalledWith(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 15, // 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
      });
    });
  });

  describe('unregisterBackgroundFetchAsync', () => {
    it('should unregister background fetch task', async () => {
      const unregisterMock = jest.fn().mockResolvedValue(undefined);

      jest
        .spyOn(BackgroundFetch, 'unregisterTaskAsync')
        .mockImplementation(unregisterMock);

      await BackgroundTaskService.unregisterBackgroundFetchAsync();

      expect(unregisterMock).toHaveBeenCalledWith(BACKGROUND_FETCH_TASK);
    });
  });
});
