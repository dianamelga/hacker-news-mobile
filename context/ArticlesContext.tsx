import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
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

const ArticlesContext = createContext<ArticlesContextProps | undefined>(
  undefined,
);

export const useArticlesContext = (): ArticlesContextProps => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error(
      'useArticlesContext must be used within an ArticlesProvider',
    );
  }
  return context;
};

interface ArticlesProviderProps {
  children: ReactNode;
}

export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({
  children,
}) => {
  const [deletedArticles, setDeletedArticles] = useState<Article[]>([]);
  const [favorited, setFavorited] = useState<Article[]>([]);
  const {
    fetchData,
    articles: allArticles,
    loading,
    error,
  } = useFetchArticles();

  useEffect(() => {
    // AsyncStorage.clear(); // TODO: remove later, just testing

    loadArticles();
  }, []);

  const favoritedArticles: Article[] = useMemo(() => {
    // ensure we do not show favorited articles that were locally deleted or removed from the API
    return favorited
      .filter(
        (item) =>
          !deletedArticles.some(
            (deleted) => deleted.objectID === item.objectID,
          ),
      )
      .filter((item) =>
        allArticles.some((article) => article.objectID === item.objectID),
      )
      .map((item) => {
        return { ...item, is_favorite: true };
      });
  }, [deletedArticles, favorited, allArticles]);

  const filteredArticles: Article[] = useMemo(() => {
    // ensure we do not show articles that were locally deleted
    return allArticles
      .filter(
        (item) =>
          !deletedArticles.some(
            (deleted) => deleted.objectID === item.objectID,
          ),
      )
      .map((item) => {
        return {
          ...item,
          is_favorite: favoritedArticles.some(
            (fav) => fav.objectID === item.objectID,
          ),
        };
      });
  }, [deletedArticles, allArticles, favoritedArticles]);

  const loadArticles = async () => {
    const articlesDeleted = await loadDeletedArticles();
    setDeletedArticles(articlesDeleted);
    const articlesFavorited = await loadFavoritedArticles();
    setFavorited(articlesFavorited);
    await fetchData();
  };

  const loadDeletedArticles = async (): Promise<Article[]> => {
    try {
      const storedDeletedArticles =
        await AsyncStorage.getItem(DELETED_STORAGE_KEY);
      return storedDeletedArticles ? JSON.parse(storedDeletedArticles) : [];
    } catch (error) {
      console.error('Error loading deleted articles:', error);
      return [];
    }
  };

  const loadFavoritedArticles = async (): Promise<Article[]> => {
    try {
      const storedFavoritedArticles = await AsyncStorage.getItem(
        FAVORITED_STORAGE_KEY,
      );
      const favoritedArticles: Article[] = storedFavoritedArticles
        ? JSON.parse(storedFavoritedArticles)
        : [];
      const deletedArticles = await loadDeletedArticles();
      const favoritedNotDeleted = favoritedArticles.filter(
        (item) =>
          !deletedArticles.some(
            (deleted) => deleted.objectID === item.objectID,
          ),
      );
      return favoritedNotDeleted;
    } catch (error) {
      console.error('Error loading favorited articles:', error);
      return [];
    }
  };

  const deleteArticle = async (article: Article) => {
    try {
      const storedDeletedArticles = await loadDeletedArticles();
      const updatedDeletedArticles = [...storedDeletedArticles, article];

      await AsyncStorage.setItem(
        DELETED_STORAGE_KEY,
        JSON.stringify(updatedDeletedArticles),
      );
      setDeletedArticles(updatedDeletedArticles);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const toggleFavoriteArticle = async (article: Article) => {
    try {
      const favoritedArticles: Article[] = await loadFavoritedArticles();

      const updatedFavoritedArticles = favoritedArticles.some(
        (item) => item.objectID === article.objectID,
      )
        ? favoritedArticles.filter((item) => item.objectID !== article.objectID) // Remove if present
        : [...favoritedArticles, { ...article, is_favorite: true }]; // Add if not present

      await AsyncStorage.setItem(
        FAVORITED_STORAGE_KEY,
        JSON.stringify(updatedFavoritedArticles),
      );
      setFavorited(updatedFavoritedArticles);
    } catch (error) {
      console.error('Error toggling favorite article:', error);
    }
  };

  return (
    <ArticlesContext.Provider
      value={{
        filteredArticles,
        deletedArticles,
        favoritedArticles,
        loading,
        error,
        refreshArticles: loadArticles,
        deleteArticle,
        toggleFavoriteArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
