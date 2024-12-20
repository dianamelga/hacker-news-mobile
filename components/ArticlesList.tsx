import { useArticlesManager } from '@/hooks/useArticlesManager';
import { Article } from '@/models/HackerNews';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import ArticleCard from './ArticleCard';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { themeColors } from '@/styles/colors';
import { useRouter } from 'expo-router';

type ArticleType = 'all' | 'deleted' | 'favorited';

interface ArticlesListProps {
  type: ArticleType;
}

export const ArticlesList = ({ type }: ArticlesListProps) => {
  const {
    refreshArticles,
    loading,
    filteredArticles,
    favoritedArticles,
    deletedArticles,
    error,
    deleteArticle,
    toggleFavoriteArticle,
  } = useArticlesManager();
  const router = useRouter();

  const previousScreen =
    type === 'deleted'
      ? 'Deleted'
      : type === 'favorited'
        ? 'Favorites'
        : 'Home';

  const handleDelete = useCallback(
    (article: Article) => {
      deleteArticle(article);
    },
    [deleteArticle],
  );

  // Define the callback function for handling item press
  const handleItemPress = (item: Article) => {
    // Navigate to the detail screen, passing the article URL as a query parameter
    router.push({
      pathname: '/article-detail',
      params: { articleUrl: item.story_url, previousScreen: previousScreen }, // Assuming `item.url` contains the article URL
    });
  };

  const canFavorite = type === 'all' || type === 'favorited';
  const canDelete = type !== 'deleted';

  const articles: Article[] = useMemo(() => {
    switch (type) {
      case 'favorited':
        return favoritedArticles;
      case 'deleted':
        return deletedArticles;
      default:
        return filteredArticles;
    }
  }, [favoritedArticles, deletedArticles, filteredArticles, type]);

  return (
    <ThemedView style={styles.container}>
      {error && (
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
      )}

      {articles.length > 0 ? (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.objectID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <ArticleCard
                toggleFavorite={canFavorite ? toggleFavoriteArticle : undefined}
                article={item}
                deleteItem={canDelete ? handleDelete : undefined}
              />
            </TouchableOpacity>
          )}
          onRefresh={refreshArticles}
          ItemSeparatorComponent={() => <Divider />}
          contentContainerStyle={styles.contentContainer}
          refreshing={loading}
          ListHeaderComponent={
            loading ? (
              <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={themeColors.primary} />
              </ThemedView>
            ) : null
          }
        />
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText>{`No ${type} articles available`}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
