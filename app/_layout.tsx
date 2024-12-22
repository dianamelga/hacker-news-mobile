import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/use-color-scheme.hook';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ArticlesProvider } from '@/context/articles-context';
import { StyleSheet } from 'react-native';
import { registerBackgroundFetchAsync } from '@/utils/background-tasks';
import { NotificationService } from '@/services/notification-service';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const setupTasks = async () => {
      console.log('setting up tasks');
      try {
        await NotificationService.registerForPushNotifications();
        await registerBackgroundFetchAsync();
      } catch (error) {
        console.error('Error setting up background fetch:', error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    setupTasks();
  }, []);

  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.container}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            <ArticlesProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="(screens)/article-detail"
                  options={({ route }) => ({
                    title: 'Article Details',
                    headerBackTitle: `${route.params?.previousScreen ?? 'Back'}`,
                  })}
                />
              </Stack>
              <StatusBar style="auto" />
            </ArticlesProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
