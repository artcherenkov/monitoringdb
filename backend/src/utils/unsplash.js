const axios = require('axios');

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const getUnsplashImage = async (query) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: query,
        count: 1,
        orientation: 'landscape',
        client_id: UNSPLASH_ACCESS_KEY,
      },
    });

    return response.data[0].urls.regular;  // Возвращаем URL изображения
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    throw error;
  }
};

module.exports = {
  getUnsplashImage,
};
