import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const instance = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Use base URL from environment variables
});

const axios = setupCache(instance, {
  ttl: 15 * 60 * 1000, // Cache duration: 15 minutes
  interpretHeader: true, // Enable cache-control interpretation if server provides headers
  methods: ['get'], // Cache only GET requests
});

export default axios;
