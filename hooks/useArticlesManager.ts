import { useArticlesContext } from '@/context/ArticlesContext';

export const useArticlesManager = () => {
    const { filteredArticles, favoritedArticles, deletedArticles, loading, error, deleteArticle, toggleFavoriteArticle, refreshArticles } = useArticlesContext();

    return {
        filteredArticles,
        deletedArticles,
        favoritedArticles,
        loading,
        error,
        refreshArticles,
        deleteArticle,
        toggleFavoriteArticle,
    };
};
