import React from 'react';
import { handleActions } from 'redux-actions';
import { takeEvery, put, call } from 'redux-saga/effects';

import Theme from 'utils/theme';
import Background from 'utils/background';
import ButtonColor from 'utils/buttonColor';
import { Events, scroller } from 'react-scroll'

import {
  LOADING_ERROR,
  SET_DATA,
  UPDATE_CONFIG_DATA,
  SET_INSTAGRAM_FEED,
  SET_YOUTUBE_FEED,
  CATALOG_FILTER,
  CATALOG_FILTER_HEADER,
  CATALOG_SET_STORY,
  CATALOG_ORDER,
  CATALOG_ORDER_CLEAR,
  CACHE_DATA,
  CACHE_PLAYLISTS,
  CATALOG_PLAY,
  CATALOG_PAUSE,
  CATALOG_NEXT
} from 'constants/actions';
import CatalogItem from 'components/CatalogItems/CatalogItem';

import {
  CATALOG_HEADER,
} from 'constants/catalogTypes';

const defaultTheme = new Theme({ name: 'Default' });
const initialState = {
  error: null,
  data: null,
  themes: [defaultTheme],
  instagramFeeds: {},
  currentTheme: defaultTheme,
  backgrounds: [],
  buttonColors: [],
  config: {},
  account: {},
  storyGuid : null,
  headerGuid: null,
  order: {},
  playingGuid: null,
  isSubscriber: false
};

const reducer = handleActions({
  [LOADING_ERROR]: (state, { error }) => ({
    ...state,
    error
  }),

  [SET_DATA]: (state, {
    themes,
    backgrounds,
    buttonColors,
    config,
    account,
    data,
    isSubscriber
  }) => {
    const selectedTheme = themes.find((theme) => data.settings.theme === theme.name)
      || (themes[0] && { ...themes[0] })
      || { ...state.themes[0] };

    let currentTheme = new Theme(selectedTheme);

    if (data.settings.background) {
      const selectedBakground = backgrounds.find((background) => data.settings.background === background.name);
      if (selectedBakground)
        currentTheme = new Theme({ ...currentTheme, background: selectedBakground });
    }

    if (data.settings.color) {
      const selectedButtonColor = buttonColors.find((buttonColor) => data.settings.color === buttonColor.name);
      if (selectedButtonColor)
        currentTheme = new Theme({ ...currentTheme, button: selectedButtonColor });
    }

    let headerGuid = null;
    let storyGuid = null;
    if (data.catalogItems) {
      for (let i = data.catalogItems.length - 1; i >= 0; i--) {
        let item = data.catalogItems[i];
        if (item.type === CATALOG_HEADER) {
          headerGuid = item.guid;
          storyGuid = item.storyGuid;
        } else if (item.storyGuid === storyGuid) {
          item.headerGuid = headerGuid;
        }
      }
    }

    return {
      ...state,
      themes: themes.map((theme) => new Theme(theme)),
      backgrounds: backgrounds.map((background) => new Background(background)),
      buttonColors: buttonColors.map((buttonColor) => new ButtonColor(buttonColor)),
      config,
      account,
      data,
      currentTheme,
      error: null,
      isSubscriber
    };
  },

  [UPDATE_CONFIG_DATA]: (state, { title, description }) => ({
    ...state,
    data: {
      ...state.data,
      title,
      description
    }
  }),

  [SET_INSTAGRAM_FEED]: (state, { title, data }) => {
    var store = {
      ...state.instagramFeeds
    };
    store[title] = JSON.stringify(data);
    return { 
      ...state,
      instagramFeeds: store
    };
  },

  [SET_YOUTUBE_FEED]: (state, { title, data }) => {
    var store = {
      ...state.youTubeFeeds
    };
    store[title] = JSON.stringify(data);
    return { 
      ...state,
      youTubeFeeds: store
    };
  },

  [CATALOG_FILTER] : (state, { storyGuid } ) => {
    return {
      ...state,
      storyGuid
    }
  },

  [CATALOG_FILTER_HEADER] : (state, { headerGuid }) => {
    return {
      ...state,
      headerGuid
    }
  },

  [CATALOG_ORDER] : (state, { guid, count, sum, currency }) => {
    return {
      ...state,
      order: {
        ...state.order,
        [guid]: { count, sum, currency } 
      }
    }
  },

  [CATALOG_ORDER_CLEAR] : (state) => {
    return {
      ...state,
      order: {}
    }
  },

  [CACHE_DATA] : (state, { cached }) => {
    const { catalogItems, stories, blocks, avatar, avatarPreview } = state.data;
    catalogItems.forEach(ci => {
      if (ci.audio && cached[ci.audio]) {
        ci.audioCache = cached[ci.audio];
      }
      if (ci.audioPaid && cached[ci.audioPaid]) {
        ci.audioPaidCache = cached[ci.audioPaid];
      }
      if (ci.image && cached[ci.image]) {
        ci.image = cached[ci.image];
      }
    });

    stories.forEach(s => {
      if (s.image && cached[s.image]) {
        s.image = cached[s.image];
      }
    });

    blocks.forEach(b => {
      if (b.image && cached[b.image]) {
        b.image = cached[b.image];
      }
    });

    return {
      ...state,
      data: {
        ...state.data,
        avatar: avatar && cached[avatar] ? cached[avatar] : avatar,
        avatarPreview: avatarPreview && cached[avatarPreview] ? cached[avatarPreview] : avatarPreview,
        stories,
        blocks,
        catalogItems
      }
    }
  },

  [CACHE_PLAYLISTS] : (state, { cached }) => {
    const { catalogItems } = state.data;
    catalogItems.forEach(ci => {
      if (ci.playlistUrl && cached[ci.playlistUrl]) {
        ci.playlist = cached[ci.playlistUrl];
        ci.audio = ci.playlist[0]?.audio;
        ci.text = ci.playlist[0]?.text;
      }
    });

    return {
      ...state,
      data: {
        ...state.data,
        catalogItems
      }
    }
  },

  [CATALOG_PLAY] : (state, { guid }) => {
    return {
      ...state,
      playingGuid: guid
    }
  },
  [CATALOG_PAUSE] : (state, { guid }) => {
    return {
      ...state,
      playingGuid: state.playingGuid === guid ? null : state.playingGuid
    }
  },
  [CATALOG_NEXT] : (state, { guid }) => {
    const { catalogItems } = state.data;
    const catalogItem = catalogItems.filter(ci => ci.guid === guid)[0];
    if (catalogItem?.playlist) {
      if (catalogItem.playlist.length <= 1) {
        catalogItem.audio = catalogItem.playlist[0]?.audio;
        catalogItem.text = catalogItem.playlist[0]?.text;
      } else {
        const playedInd = catalogItem.playlist.map((a, i) => { return { a, i } }).filter(e => e.a.audio === catalogItem.audio)[0]?.i;
        if (playedInd >= catalogItem.playlist.length - 1) {
          catalogItem.audio = catalogItem.playlist[0].audio;
          catalogItem.text = catalogItem.playlist[0].text;
        } else {
          catalogItem.audio = catalogItem.playlist[playedInd + 1].audio;
          catalogItem.text = catalogItem.playlist[playedInd + 1].text;
        }
      }
    }

    return {
      ...state,
      catalogItems
    }
  },
}, initialState);

export default reducer;
