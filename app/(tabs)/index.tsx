import { ArticlesList } from '@/components/articles-list.component';
import { ThemedView } from '@/components/themed-view.component';
import React from 'react';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <ThemedView style={styles.container} safeArea={false}>
      <ArticlesList type="all" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
