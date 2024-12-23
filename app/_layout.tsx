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
import { NotificationService } from '@/services/notification-service';
import { SettingsButton } from '@/components/settings-button.component';
import typography from '@/styles/typography';
import { useFonts } from 'expo-font';
import { BackgroundTaskService } from '@/services/background-task-service';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Nunito-Bold': require('@/assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Black': require('@/assets/fonts/Nunito-Black.ttf'),
    'Nunito-Regular': require('@/assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('@/assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('@/assets/fonts/Nunito-ExtraBold.ttf'),
    // Add other fonts if needed
  });

  const setupTasks = async () => {
    try {
      await NotificationService.registerForPushNotifications();
      await BackgroundTaskService.registerBackgroundFetchAsync();
    } catch (error) {
      console.error('Error setting up background fetch:', error);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    if (fontsLoaded) {
      setupTasks();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.container}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            <ArticlesProvider>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    title: 'Hacker News',
                    headerTitleStyle: typography.heading1,
                    headerRight: () => <SettingsButton />,
                  }}
                />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="(screens)/article-detail"
                  options={({ route }) => ({
                    title: 'Article Details',
                    headerBackTitle: `${route.params?.previousScreen ?? 'Back'}`,
                  })}
                />
                <Stack.Screen
                  name="(screens)/settings"
                  options={{ title: 'Settings', headerBackTitle: 'Back' }}
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
