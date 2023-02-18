export async function getSearchNewsAPI(searchTerm) {
    const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
    try {
      const response = await axios.get(`${BASE_URL}?q=${searchTerm}&api-key=${KEY}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  