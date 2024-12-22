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

// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
};

// (Optional) Unregister tasks by specifying the task name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export const unregisterBackgroundFetchAsync = async () => {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
};
