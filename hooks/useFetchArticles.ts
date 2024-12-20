
import { useState } from 'react';
import { fetchArticles } from '@/services/hackerNewsApi'; 
import { Article } from '@/models/HackerNews';

export const useFetchArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    } catch (err) {
      setError('Failed to load articles.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, articles, loading, error };
};
