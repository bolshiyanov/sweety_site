import superagent from 'superagent';

const SOMETHING_WENT_WRONG = 'Что-то пошло не так!';

const host = 'https://admapi.itsinsta.site';

const responseBody = (res) => res.body;

const handleError = (e) => {
  console.error(SOMETHING_WENT_WRONG, e);
};

const requests = {
  get: (url, params) => superagent.get(`${host}${url}`).query(params)
    .catch(handleError)
    .then(responseBody),
  post: (url, params) => superagent.post(`${host}${url}`).send(params)
    .catch(handleError)
    .then(responseBody),
  put: (url, params) => superagent.put(`${host}${url}`).send(params)
    .catch(handleError)
    .then(responseBody),
  del: (url, params) => superagent.del(`${host}${url}`).send(params)
    .catch(handleError)
    .then(responseBody)
};

const API = {
  getData: () => requests.get('/api/profiles/pages/public/maman_makarova')
};

export default API;