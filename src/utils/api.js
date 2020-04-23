import superagent from 'superagent';
import { getSearchString } from 'utils/url';

const SOMETHING_WENT_WRONG = 'Something went wrong!';

const host = 'https://admapi.itsinsta.site';
const adminSite = "https://dash.sweety.link";
const cookieDomain = "sweety.link";
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

  var errors = !e.response?.text ? null : JSON.parse(e.response.text)?.errors;
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
  getInstagramFeed: (account) => superagent.get(account.indexOf("http") === -1 ? `https://instagram.com/${account}/` : account)
    .catch(handleError)
    .then((response) => {
      if (!response?.text) {
        return [];
      }

      const json = JSON.parse(response.text.match(
        new RegExp('<script type="text/javascript">window\._sharedData = (.*);</script>')
      )[1]);

      const edges = json.entry_data
        .ProfilePage[0]
        .graphql
        .user
        .edge_owner_to_timeline_media
        .edges
        .splice(0, 4);

      const photos = edges.map(({ node }) => ({
        url: `https://instagram.com/p/${node.shortcode}/`,
        thumbnailUrl: node.thumbnail_src,
        displayUrl: node.display_url,
        caption: node.edge_media_to_caption.edges[0].node.text
      }));

      return photos;
    })
};

export default API;