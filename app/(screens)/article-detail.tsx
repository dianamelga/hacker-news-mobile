import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { themeColors } from '@/styles/colors';

const ArticleDetailScreen = () => {
  const { articleUrl } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  if (!articleUrl) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No article URL provided!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} safeArea={false}>
      {isLoading && (
        <ThemedView style={styles.loadingContainer} safeArea={false}>
          <ActivityIndicator size="large" color={themeColors.primary} />
        </ThemedView>
      )}

      <WebView
        source={{ uri: articleUrl }}
        style={styles.container}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default ArticleDetailScreen;
