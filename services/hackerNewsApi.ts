import api from './api';
import { Article } from '@/models/HackerNews';

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await api.get('/search_by_date', {
      params: { query: 'mobile' },
    });

    return response.data.hits;

  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
