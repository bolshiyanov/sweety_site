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
  CATALOG_SET_STORY,
  CATALOG_ORDER,
  CATALOG_ORDER_CLEAR,
  CACHE_DATA
} from 'constants/actions';

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
  order: {}
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
    data
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

    return {
      ...state,
      themes: themes.map((theme) => new Theme(theme)),
      backgrounds: backgrounds.map((background) => new Background(background)),
      buttonColors: buttonColors.map((buttonColor) => new ButtonColor(buttonColor)),
      config,
      account,
      data,
      currentTheme,
      error: null
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
    const { catalogItems } = state.data;
    catalogItems.forEach(ci => {
      if (ci.audio && cached[ci.audio]) {
        ci.audio = cached[ci.audio];
      }
    });

    return {
      ...state,
      data: {
        ...state.data,
        catalogItems
      }
    }
  }
}, initialState);

export default reducer;
