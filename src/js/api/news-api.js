import axios from 'axios';

const KEY = 'ExFFGvT2fZBzTdDFtfXKysgryhCLXIkg';

export async function getCategoriesAPI() {
  const BASE_URL =
    'https://api.nytimes.com/svc//news/v3/content/section-list.json';

  try {
    const response = await axios.get(`${BASE_URL}?api-key=${KEY}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryNewsAPI(category) {
  const BASE_URL = `https://api.nytimes.com/svc//news/v3/content/all/${category}.json`;

  try {
    const response = await axios.get(`${BASE_URL}?api-key=${KEY}&limit=500`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPopularNewsAPI() {
  const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json`;

  try {
    const response = await axios.get(`${BASE_URL}?api-key=${KEY}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchNewsAPI(searchTerm) {
  const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
  try {
    const response = await axios.get(`${BASE_URL}?q=${searchTerm}&api-key=${KEY}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
