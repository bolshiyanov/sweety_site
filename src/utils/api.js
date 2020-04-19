import superagent from 'superagent';
import { getSearchString } from 'utils/url';

const SOMETHING_WENT_WRONG = 'Something went wrong!';

const host = 'https://admapi.itsinsta.site';
const adminSite = "https://dash.sweety.link";
const cookieDomain = ".sweety.link";
let profile = null;

const setProfile = (newProfile) => {
  profile = newProfile;
};
  
export const getInvite = () => {
  return getSearchString(window.location.search, 'invid');
};

export const getRef = () => {
  return getSearchString(window.location.search, 'ref');
};

export const getAdminSite = () => {
  return adminSite;
};

export const getCookieDomain = () => {
  return cookieDomain;
};

export const getAdminSiteByInvitation = (invId) => {
  return adminSite + "?invitationId=" + invId;
};

const responseBody = (res) => {
  if (res?.body)
    return res.body;
  return res;
}

const handleError = (e) => {
  console.error(SOMETHING_WENT_WRONG, e);

  var errors = JSON.parse(e.response.text)?.errors;
  return !errors ? null : { errors };
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
  getData: () => requests.get(`/api/profiles/pages/public/${profile}`),
  register: (data) => requests.post('/api/users/register', data),
};

export default API;