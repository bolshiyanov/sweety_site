import superagent from 'superagent';
import { getSearchString } from 'utils/url';

const SOMETHING_WENT_WRONG = 'Something went wrong!';

const host = 'https://api.sweety.link';
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

export const getInstagram = () => {
  return getSearchString(window.location.search, 'instagram');
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

  try {
    var errors = !e.response?.text ? null : JSON.parse(e.response.text)?.errors;
    return !errors ? null : { errors };
  }
  catch (err) {
    console.log(err);
    return null;
  }
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
  getInstagramFeed: (account) => {
    const url = 
      account.indexOf("@") === 0 ? `https://instagram.com/${account.substring(1)}/` :
      account.indexOf("http") !== 0 || account.indexOf('instagram.com') === -1 ? 
      `https://instagram.com/${account}/` : account;
    return superagent.get(url)
    .catch(handleError)
    .then((response) => {
      if (!response?.text) {
        return {};
      }

      const content = response.text.match(
        new RegExp('<script type="text/javascript">window\._sharedData = (.*);</script>')
      )[1];
      try
      {
        const json = JSON.parse(content);
        if (!json.entry_data.ProfilePage) {
          return {};
        }

        const user = json.entry_data
          .ProfilePage[0]
          .graphql
          .user;
        const media = user.edge_owner_to_timeline_media;
        let edges = media.edges.splice(0, 8);

        const photos = edges.map(({ node }) => ({
          code: node.shortcode,
          url: `https://instagram.com/p/${node.shortcode}/`,
          thumbnailUrl: node.thumbnail_src,
          displayUrl: node.display_url,
          caption: node.edge_media_to_caption.edges[0]?.node?.text,
        }));

        return JSON.parse(JSON.stringify({
          feed: {
            title: user?.username,
            link: url,
            image: user?.profile_pic_url_hd,

            biography: user?.biography,
            fullName: user?.full_name,
            postCount: media?.count,
            externalUrl: user?.external_url,
          },
          items: photos
        }));
      }
      catch (err) {
        console.log(err);
        return {};
      }
    });
  },

  getYouTubeFeed: (url) => {
    let feedsUrl = null;
    if (url && url.indexOf("channel") >= 0) {
      const channelId = url.substring(url.lastIndexOf('/') + 1);
      feedsUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    }
    else if (url && url.indexOf("user") >= 0) {
      var pathArray = url.toLowerCase().split('/');
      let userId = pathArray[pathArray.indexOf('user') + 1];
      if (userId && userId.indexOf("?") >= 0) {
        userId = userId.substring(1, userId.indexOf(userId.indexOf("?")));
      }
      feedsUrl = `https://www.youtube.com/feeds/videos.xml?user=${userId}`;
    }
    else if (url && url.indexOf("playlist") >= 0) {
      const playlistId = getSearchString(url, 'list');
      feedsUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    }
    const requestUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(feedsUrl)}`;

    return superagent.get(requestUrl)
      .catch(handleError)
      .then(responseBody)
      .then((response) => {
        if (response?.status != 'ok') {
          return null;
        }
  
        return {
          feed: {
            title: response?.feed?.title?.replace("&quote;", '"'),
            link: response?.feed?.link,
            image: response?.feed?.image
          },
          items: response.items.splice(0, 8).map((item) => ({
            code: item?.guid,
            url: item?.link,
            thumbnailUrl: item?.thumbnail,
            displayUrl: item?.thumbnail,
            caption: item?.title
          }))
        };
      });
    },
    recoverPassword: (profile) => requests.post('/api/users/password/recover', { page: profile })
  };

export default API;