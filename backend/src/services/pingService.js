import axios from 'axios';

export const pingUrl = async (url) => {
  const start = Date.now();
  try {
    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout — don't wait forever
      // follow redirects by default, maxRedirects: 5
    });
    return {
      isUp: true,
      statusCode: response.status,
      responseTime: Date.now() - start,
      errorMessage: null,
    };
  } catch (error) {
    if (error.response) {
      // Server replied — even a 404 or 500 means it's reachable
      return { isUp: false, statusCode: error.response.status, responseTime: Date.now() - start, errorMessage: null };
    }
    // No response — timeout, DNS failure, connection refused
    return { isUp: false, statusCode: null, responseTime: Date.now() - start, errorMessage: error.message };
  }
};
