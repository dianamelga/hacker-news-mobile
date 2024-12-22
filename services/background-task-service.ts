import { NotificationService } from '@/services/notification-service';
import { fetchArticles } from './hacker-news-api';
import { LAST_CHECK_TIME } from '@/constants/async-storage-keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BackgroundTaskService = {
  checkForNewArticles: async (): Promise<void> => {
    try {
      const lastCheckTime =
        (await AsyncStorage.getItem(LAST_CHECK_TIME)) ||
        new Date(0).toISOString();

      const articles = await fetchArticles();

      await AsyncStorage.setItem(LAST_CHECK_TIME, new Date().toISOString());

      const newArticles = articles.filter(
        (article) =>
          new Date(article.created_at).getTime() >
          new Date(lastCheckTime).getTime(),
      );

      if (newArticles.length > 0) {
        console.log(`Found ${newArticles.length} new articles`);

        // Send notification for each new article, TODO: customize this
        newArticles.forEach((article) => {
          NotificationService.sendNotification(
            'New Article Available!',
            article.story_title,
          );
        });
      }
    } catch (error) {
      console.error('Error checking for new articles:', error);
    }
  },
};
