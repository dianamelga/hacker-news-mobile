import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/models/HackerNews';
import { useFetchArticles } from '@/hooks/useFetchArticles';

const DELETED_STORAGE_KEY = 'deletedArticles';
const FAVORITED_STORAGE_KEY = 'favoritedArticles';

interface ArticlesContextProps {
    filteredArticles: Article[];
    favoritedArticles: Article[];
    deletedArticles: Article[];
    loading: boolean;
    error: string | null;
    toggleFavoriteArticle: (article: Article) => Promise<void>;
    deleteArticle: (article: Article) => Promise<void>;
    refreshArticles: () => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextProps | undefined>(undefined);

export const useArticlesContext = (): ArticlesContextProps => {
    const context = useContext(ArticlesContext);
    if (!context) {
        throw new Error('useArticlesContext must be used within an ArticlesProvider');
    }
    return context;
};

interface ArticlesProviderProps {
    children: ReactNode;
}

export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({ children }) => {
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [deletedArticles, setDeletedArticles] = useState<Article[]>([]);
    const [favoritedArticles, setFavoritedArticles] = useState<Article[]>([]);
    const { fetchData, loading, articles, error } = useFetchArticles();

    useEffect(() => {
        AsyncStorage.clear(); // TODO: remove later, just testing
        const initializeData = async () => {
            await fetchData();
            await filterArticles(articles);
        };

        initializeData();
    }, []);

    useEffect(() => {
        // Refilter articles when the original list changes
        filterArticles(articles);
    }, [articles]);

    const loadDeletedArticles = async (): Promise<Article[]> => {
        try {
            const storedDeletedArticles = await AsyncStorage.getItem(DELETED_STORAGE_KEY);
            return storedDeletedArticles ? JSON.parse(storedDeletedArticles) : [];
        } catch (error) {
            console.error('Error loading deleted articles:', error);
            return [];
        }
    };

    const loadFavoritedArticles = async (): Promise<Article[]> => {
        try {
            const storedFavoritedArticles = await AsyncStorage.getItem(FAVORITED_STORAGE_KEY);
            const favoritedArticles: Article[] = storedFavoritedArticles ? JSON.parse(storedFavoritedArticles) : [];
            const deletedArticles = await loadDeletedArticles();
            const favoritedNotDeleted = favoritedArticles.filter((item) => !deletedArticles.some((deleted) => deleted.objectID === item.objectID));
            return favoritedNotDeleted;
        } catch (error) {
            console.error('Error loading favorited articles:', error);
            return [];
        }
    };

    const filterArticles = async (allArticles: Article[]) => {
        const deletedArticles = await loadDeletedArticles();
        const favoritedArticles = await loadFavoritedArticles();
        const filtered = allArticles.filter((article) => !deletedArticles.some((deleted) => deleted.objectID === article.objectID));

        const filteredWithFavorited = filtered.map((article) => {
            if (favoritedArticles.some((favorited) => favorited.objectID === article.objectID)) {
                return { ...article, is_favorite: true }; // Set is_favorite to true
            }
            return article;
        });

        console.log(`filterArticles -> favorited: ${JSON.stringify(favoritedArticles)}`);
        setFilteredArticles(filteredWithFavorited);
        setFavoritedArticles(favoritedArticles);
        setDeletedArticles(deletedArticles);
    };

    const deleteArticle = async (article: Article) => {
        console.log(`deleteArticle: ${article.story_title}, ${article.objectID}`);
        try {
            const storedDeletedArticles = await loadDeletedArticles();
            const updatedDeletedArticles = [...storedDeletedArticles, article];

            await AsyncStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(updatedDeletedArticles));

            filterArticles(articles);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const toggleFavoriteArticle = async (article: Article) => {
        console.log(`toggle favorite article: ${article.story_title}, ${article.objectID}`);
        try {
            // Retrieve the stored favorited articles from AsyncStorage
            const favoritedArticles: Article[] = await loadFavoritedArticles();

            // Toggle the article's presence in the favorited list
            const updatedFavoritedArticles = favoritedArticles.some((item) => item.objectID === article.objectID)
                ? favoritedArticles.filter((item) => item.objectID !== article.objectID)  // Remove if present
                : [...favoritedArticles, { ...article, is_favorite: true }];  // Add if not present

            // Save the updated list to AsyncStorage
            await AsyncStorage.setItem(FAVORITED_STORAGE_KEY, JSON.stringify(updatedFavoritedArticles));

            // Re-filter the articles to update UI
            filterArticles(articles);
        } catch (error) {
            console.error('Error toggling favorite article:', error);
        }
    };

    return (
        <ArticlesContext.Provider value={{
            filteredArticles,
            deletedArticles,
            favoritedArticles,
            loading,
            error,
            refreshArticles: fetchData,
            deleteArticle,
            toggleFavoriteArticle,
        }}>
            {children}
        </ArticlesContext.Provider>
    );
};
