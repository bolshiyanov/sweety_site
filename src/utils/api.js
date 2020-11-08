import superagent from 'superagent';
import { getSearchString } from 'utils/url';
import { getDefaultLanguage } from 'utils/translation';
import fileReader from 'utils/fileReader';
import { GoogleSpreadsheet } from "google-spreadsheet";

const SOMETHING_WENT_WRONG = 'Something went wrong!';

const host = 'https://api.sweety.link';
const adminSite = "https://dash.sweety.link";
const cookieDomain = "sweety.link";
let profile = null;

const gapiEmail = "catalog@sweetyimport.iam.gserviceaccount.com";
const gapiKey = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCPbQ9bbKiiPmAi\nM4OJxvcPYQX4dOEcjA/zflguCelELC+CptGh8Ye1GrzfhoMudR2ea1lBhZ35tBzS\nzpI+e3fyrYjrKh2CTB41xp4En37NCDUfaVD5ni5QEwyLvuq5pw+wvv4nocnRrEtc\n0c7RD61Ij6E4+sSIBHrBAZAlNBaimbfgqVGn6Y4wWZK6CawTe7lsOc8Ujaarc21o\nYIOg9rW5idxFYAJUMJAcy62V7hz86ROXF2lkl9gjBuH2Npz6q0oV3JVbTveBFt5u\nfYeJj4pBWQtRD1rWS86O4Y4r1K+8fmVxwsRX3CAshONgW27wniL5qT2P21s3Kadt\nijclltj1AgMBAAECggEAKRauWpuzZ9+EvOeTHGpypuY9xqL9Rqddfn1Il8/hEtWx\nurU9wy4lmZ2SVFr9w9ZraNIKHPpBeqK9yyrAvMO0ZkKOwggrsgNKeE9xP5PNyME8\nLsaGGyzUyb3bT0GfjxYsKY9d0k7IOZgpcursW/oow2vaXS+CFBFsdVSUTgQxI92G\nAoplOOyKCfTazMQghdU7bDMwGMYNlULNNQEwAS5WJ32PDe3PBM4+1qK5L2sBD4to\nAn2Ma4He0E4FXlmfhokd2iAPD4GJI1qK7MZJYMIHeur8XhuuVI3/9OrEEiFpte6K\nSCPE8f5O4txR0Q23BAKD5aaJ2zwHGFAT+Wfk2yTSFQKBgQDCA76RdmiJ3Q2skMfR\nkaAl8Ra4lUv6WV7a4RAsWzZAv3MjUh5cn3gCTZAdfaCm8/oI6mfaE0Q/aCAygIhD\nMx1zP99M29q8O4GyD/UUBfbeZpy/ed9N7hDLdi/Wp7hqTmK+R86q6f20qiRIIUxv\nkTn72dh8M4h492/i8Nly/ttwFwKBgQC9P7m1Vd9G9517REh57hVRRsUOSgzVAO6s\nhRKBX2+OFOLAX+4za91cLd3Z1Pg4oNmq+IfQiKrs5cI3P0Nl9BrgPaieuAgjCyyP\nhRAlbMd6QB7D84xTwI+06eN1Q6aFK3S6gL2Vt4JC+DygroFM0vSeWQlHnY5QnvAE\nlE7xrbX60wKBgERhAXdPHkUIrdsWI/bOtnzo3bMsm1yexvmpvQOFGjfzwea++Ih4\ng9l78MEUF9z/vC4MP5HynGkkj8R83ImiqEyIRHFYQ114M5vIV/44o+t6iuBJWdSj\nhTPQccfb0PlWqyKZOFOwqIRWOvdZFRF1Q9Rp0QzlNMI9oyd+74TCIiD9AoGAdxZa\nrhlTXz0CBEd7s/51u6dk6RD/8imcB0PV2UNM14OdDKFRK1p8+TyDlkfFyxys3EF4\ndWkK5ffOtyVALC/nmaQzL21u8V5etBFvj51cCTnAIl5nt2w9AgML9waTCsnFsnbA\n1i2b8rhyrkohY058UAiHJmGm5GSfdMI+yyYclbECgYBTEz5uHO1tXshG0+E33mRG\nzWdP13a9IeMSzbCRKc5uz3cS3idMJTIuUnK6oU50c1qwAH9s3zk+2SLZ8lerLNh3\n3sMYeIh0y0b1ZsddaBi5SThBdl1gs4pWpYi31VxQhlXCDEsnRb+CEH5Kx57sbEGa\ntbk2c9Xz9SCfLYDg9stzsQ==\n-----END PRIVATE KEY-----\n";
const gssPrefix = "https://docs.google.com/spreadsheets/d/";

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

export const getAdminSite = (invId) => {
  if (invId) {
    return adminSite + "?invitationId=" + invId;
  }
  else {
    return adminSite;
  }
};

export const getCookieDomain = () => {
  return cookieDomain;
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
  updateProfile: (value) => {
    setProfile(value);
  },
  getData: () => requests.get(`/api/profiles/pages/public/${profile}`),
  register: (data) => requests.post('/api/users/register', { ...data, lang: getDefaultLanguage() }),
  sendOrder: (data) => requests.post(`/api/profiles/${profile}/preorders`, data),
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
    recoverPassword: (profile) => requests.post('/api/users/password/recover', { page: profile }),
    toDataUrl: (url) => {
      return new Promise ((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          resolve(null);
        };
        const loadingUrl = window.location.hostname !== "localhost" || !url.startsWith("https://sweety.link") ? url :
          "https://cors-anywhere.herokuapp.com/" + url;
        xhr.open('GET', loadingUrl);
        xhr.responseType = 'blob';
        xhr.send();
      })
    },
    getGoogleSpreadSheet: async (docUrl) => {
      let docId = docUrl.substring(gssPrefix.length);
      docId = docId.substring(0, docId.indexOf("/edit"));
      const doc = new GoogleSpreadsheet(docId);
      try {
        await doc.useServiceAccountAuth({
          client_email: gapiEmail,
          private_key: gapiKey,
        });
        // loads document properties and worksheets
        await doc.loadInfo();
    
        const sheet = doc.sheetsById["0"];
        return sheet.getRows();
      } catch (e) {
        console.error('Error: ', e);
      }
    }
  };

export default API;