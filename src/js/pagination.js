import axios from 'axios';

const key = 'XINA7yqi4ZNcq46o0RcxxTCJymTVrKDJ';

function fetchPopularNews() {
  return axios
    .get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${key}`
    )
    .then(response => response.data);
}

fetchPopularNews()
  .then(data => console.log(data))
  .catch(error => console.error(error));

