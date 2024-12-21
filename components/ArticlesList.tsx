import { useArticlesManager } from '@/hooks/useArticlesManager';
import { Article } from '@/models/HackerNews';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import ArticleCard from './ArticleCard';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { themeColors } from '@/styles/colors';

type ArticleType = 'all' | 'deleted' | 'favorited';

interface ArticlesListProps {
    type: ArticleType;
};

export const ArticlesList = ({ type }: ArticlesListProps) => {
    const { refreshArticles, loading, filteredArticles, favoritedArticles, deletedArticles, error, deleteArticle, toggleFavoriteArticle } = useArticlesManager();

    const handleDelete = useCallback((article: Article) => {
        console.log('handleDelete');
        deleteArticle(article);
    }, []);

    const canFavorite = type === 'all' || type == 'favorited';
    const canDelete = type !== 'deleted';

    const articles: Article[] = useMemo(() => {
        switch (type) {
            case 'favorited': return favoritedArticles;
            case 'deleted': return deletedArticles;
            default: return filteredArticles;
        }
    }, [favoritedArticles, deletedArticles, filteredArticles, type]);

    return (
        <ThemedView style={styles.container}>
            {error && <ThemedText style={styles.errorText}>Error: {error}</ThemedText>}

            <FlatList
                data={articles}
                keyExtractor={(item) => item.objectID}
                renderItem={({ item }) => (
                    <ArticleCard
                        toggleFavorite={canFavorite ? toggleFavoriteArticle : undefined}
                        article={item}
                        deleteItem={canDelete ? handleDelete : undefined}
                    />
                )}
                onRefresh={refreshArticles}
                ItemSeparatorComponent={() => <Divider />}
                contentContainerStyle={{ paddingVertical: 0 }}
                refreshing={loading}
                ListHeaderComponent={loading ? (
                    <ThemedView style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={themeColors.primary} />
                    </ThemedView>
                ) : null}
            />

        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});