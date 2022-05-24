import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://opentdb.com/',
});

export function fetchQuestions(difficulty) {
  // link to open API link config page https://opentdb.com/api_config.php
  return Api.get('/api.php', {
    params: {
      amount: 10,
      category: 18,
      difficulty,
    },
  });
}
