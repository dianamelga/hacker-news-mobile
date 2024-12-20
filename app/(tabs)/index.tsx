import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFetchArticles } from '@/hooks/useFetchArticles';
import { ActivityIndicator } from 'react-native-paper';
import ArticleCard from '@/components/ArticleCard';
import { useEffect } from 'react';

const HomeScreen = () => {

  const { fetchData, loading, articles, error } = useFetchArticles();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#FF3A44" />}
      {error && <ThemedText style={styles.errorText}>Error: {error}</ThemedText>}

      {!loading && !error && (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.objectID} // Assuming objectID is unique for each article
          renderItem={({ item }) => (
            <ArticleCard
              title={item.title || 'No Title'}
              author={item.author || 'Unknown Author'}
              createdAt={item.created_at}
            />
          )}
          onRefresh={fetchData} // Pull-to-refresh
          refreshing={loading}
        />
      )}
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});