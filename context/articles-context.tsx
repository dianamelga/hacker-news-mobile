import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { Article } from '@/models/hacker-news';
import { useFetchArticles } from '@/hooks/use-fetch-articles.hook';
import {
  DELETED_STORAGE,
  FAVORITED_STORAGE,
  ALL_ARTICLES_STORAGE,
} from '@/constants/async-storage-keys';
import { loadLocalData, saveLocalData } from '@/utils/storage';

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
  const [allArticlesCached, setAllArticlesCached] = useState<Article[]>();
  const {
    fetchData,
    articles: allArticles,
    loading,
    error,
  } = useFetchArticles();

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    // update cache
    saveLocalData(ALL_ARTICLES_STORAGE, allArticles);
    setAllArticlesCached(allArticles);
  }, [allArticles]);

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
        (allArticles || allArticlesCached).some(
          (article) => article.objectID === item.objectID,
        ),
      )
      .map((item) => {
        return { ...item, is_favorite: true };
      });
  }, [favorited, deletedArticles, allArticles, allArticlesCached]);

  const filteredArticles: Article[] = useMemo(() => {
    // ensure we do not show articles that were locally deleted
    return (allArticles || allArticlesCached)
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
  }, [allArticles, allArticlesCached, deletedArticles, favoritedArticles]);

  const loadArticles = async () => {
    const articlesDeleted = await loadDeletedArticles();
    setDeletedArticles(articlesDeleted);
    const articlesFavorited = await loadFavoritedArticles();
    setFavorited(articlesFavorited);
    const allArticlesCached = await loadCachedArticles();
    setAllArticlesCached(allArticlesCached);
    await fetchData();
  };

  const loadCachedArticles = async (): Promise<Article[]> => {
    try {
      const cachedArticles =
        await loadLocalData<Article[]>(ALL_ARTICLES_STORAGE);
      return cachedArticles || [];
    } catch (error) {
      console.error('Error loading cached articles:', error);
      return [];
    }
  };

  const loadDeletedArticles = async (): Promise<Article[]> => {
    try {
      const storedDeletedArticles =
        await loadLocalData<Article[]>(DELETED_STORAGE);
      return storedDeletedArticles || [];
    } catch (error) {
      console.error('Error loading deleted articles:', error);
      return [];
    }
  };

  const loadFavoritedArticles = async (): Promise<Article[]> => {
    try {
      const storedFavoritedArticles =
        await loadLocalData<Article[]>(FAVORITED_STORAGE);
      const favoritedArticles: Article[] = storedFavoritedArticles || [];
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

      await saveLocalData<Article[]>(DELETED_STORAGE, updatedDeletedArticles);
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

      await saveLocalData<Article[]>(
        FAVORITED_STORAGE,
        updatedFavoritedArticles,
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
