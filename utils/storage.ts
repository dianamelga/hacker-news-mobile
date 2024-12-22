import AsyncStorage from '@react-native-async-storage/async-storage';

// Generic function to save data
export const saveLocalData = async <T>(
  key: string,
  value: T,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
  }
};

// Generic function to load data
export const loadLocalData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error loading data for key ${key}:`, error);
    return null;
  }
};

// Generic function to remove data
export const removeLocalData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
  }
};

// Generic function to check if data exists
export const hasLocalData = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null;
  } catch (error) {
    console.error(`Error checking data for key ${key}:`, error);
    return false;
  }
};
