import { BACKGROUND_FETCH_TASK } from '@/constants/async-storage-keys';
import { BackgroundTaskService } from '@/services/background-task-service';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// This needs to be called in the global scope (e.g outside of your React components)
console.log('define task');
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
