import superagent from 'superagent';
import { getSearchString } from 'utils/url';

const SOMETHING_WENT_WRONG = 'Что-то пошло не так!';

const host = 'https://admapi.itsinsta.site';
const adminSite = "https://dash.sweety.link";
let profile = null;

const setProfile = (newProfile) => {
  profile = newProfile;
};
  
export const getInvite = () => {
  return getSearchString(window.location.search, 'invid');
};

export const getAdminSite = () => {
  return adminSite;
};

const responseBody = (res) => res.body;

const handleError = (e) => {
  console.error(SOMETHING_WENT_WRONG, e);
};

const requests = {
  get: (url, params) => superagent.get(`${host}${url}`).query(params)
    .retry(100)
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
  updateProfile: (value) => setProfile(value),
  getData: () => requests.get(`/api/profiles/pages/public/${profile}`)
};

export default API;