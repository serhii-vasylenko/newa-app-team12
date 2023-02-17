import axios from 'axios';

async function getCategories(source, section, version='v3', news='news') {
  const BASE_URL = `https://api.nytimes.com/svc/${news}/${version}/${source}/${section}.json`;
  const KEY = 'ExFFGvT2fZBzTdDFtfXKysgryhCLXIkg';

  try {
    const response = await axios.get(`${BASE_URL}?api-key=${KEY}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getCategories;
