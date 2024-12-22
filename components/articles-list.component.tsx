import { useArticlesManager } from '@/hooks/use-articles-manager.hook';
import { Article } from '@/models/hacker-news';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './themed-view.component';
import { ThemedText } from './themed-text.component';
import ArticleCard from './article-card.component';
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

  const handleItemPress = (item: Article) => {
    router.push({
      pathname: '/article-detail',
      params: { articleUrl: item.story_url, previousScreen: previousScreen },
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
    <ThemedView style={styles.container} safeArea={false}>
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
        />
      ) : loading ? (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.primary} />
        </ThemedView>
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
