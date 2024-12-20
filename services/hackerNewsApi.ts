import { Article } from '@/models/HackerNews';
import api from '@/services/api';

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    console.log(`start fetching...`);
    const response = await api.get('/search_by_date', {
      params: { query: 'mobile' },
    });

    console.log(`response: ${JSON.stringify(response.data.hits)}`);
    return response.data.hits;

  } catch (error: any) {
    console.log(`ERROR FETCH: ${error.mesage}`);
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
