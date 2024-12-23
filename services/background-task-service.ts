import { NotificationService } from '@/services/notification-service';
import { fetchArticles } from './hacker-news-api';
import {
  BACKGROUND_FETCH_TASK,
  LAST_CHECK_TIME,
  NOTIFICATION_PREFERENCES,
} from '@/constants/async-storage-keys';
import { loadLocalData, saveLocalData } from '@/utils/storage';
import { NotificationPreference } from '@/models/notification-preference';
import { ALL_TOPICS } from '@/hooks/use-settings.hook';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

export const BackgroundTaskService = {
  checkForNewArticles: async (): Promise<void> => {
    try {
      const lastCheckTime =
        (await loadLocalData<string>(LAST_CHECK_TIME)) ||
        new Date(0).toISOString();

      const articles = await fetchArticles();

      await saveLocalData<string>(LAST_CHECK_TIME, new Date().toISOString());

      const newArticles = articles.filter(
        (article) =>
          new Date(article.created_at).getTime() >
          new Date(lastCheckTime).getTime(),
      );

      const preferredTopics = await loadLocalData<NotificationPreference[]>(
        NOTIFICATION_PREFERENCES,
      );

      if (
        (newArticles.length > 0 && preferredTopics) ||
        (preferredTopics &&
          preferredTopics.some((pref) => pref.topic === ALL_TOPICS))
      ) {
        // Filter articles based on preferred topics
        const filteredArticles = preferredTopics.some(
          (pref) => pref.topic === ALL_TOPICS,
        )
          ? newArticles
          : newArticles.filter((article) =>
              preferredTopics.some((pref) =>
                article.story_title
                  ?.toLowerCase()
                  .includes(pref.topic.toLowerCase()),
              ),
            );

        if (filteredArticles.length > 0) {
          // Send a notification for each relevant article
          filteredArticles.forEach((article) => {
            NotificationService.sendNotification(
              'New Article Available!',
              article.story_title,
            );
          });
        } else {
          console.log('No new articles found for current preferences');
        }
      } else {
        console.log('No new articles found');
      }
    } catch (error) {
      console.error('Error checking for new articles:', error);
    }
  },

  // This needs to be called in the global scope (e.g outside of your React components)
  defineBackgroundTask: () => {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      console.log('Executing background tasks...');
      try {
        await BackgroundTaskService.checkForNewArticles();

        return BackgroundFetch.BackgroundFetchResult.NewData;
      } catch (error) {
        console.error('Error executing background task:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
      }
    });
  },

  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  registerBackgroundFetchAsync: async () => {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  },

  // (Optional) Unregister tasks by specifying the task name
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  unregisterBackgroundFetchAsync: async () => {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  },
};
