import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const ArticleDetailScreen = () => {
  const { articleUrl } = useLocalSearchParams();

  if (!articleUrl) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No article URL provided!</ThemedText>
      </ThemedView>
    );
  }

  return <WebView originWhitelist={['*']} source={{ uri: articleUrl }} />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ArticleDetailScreen;
