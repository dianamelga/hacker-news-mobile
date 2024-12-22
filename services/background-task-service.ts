import { NotificationService } from '@/services/notification-service';
import { fetchArticles } from './hacker-news-api';
import {
  LAST_CHECK_TIME,
  NOTIFICATION_PREFERENCES,
} from '@/constants/async-storage-keys';
import { loadLocalData, saveLocalData } from '@/utils/storage';
import { NotificationPreference } from '@/models/notification-preference';

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

      if (newArticles.length > 0 && preferredTopics) {
        // Filter articles based on preferred topics
        const filteredArticles = newArticles.filter((article) =>
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
        }
      }
    } catch (error) {
      console.error('Error checking for new articles:', error);
    }
  },
};
