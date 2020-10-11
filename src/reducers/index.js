import React from 'react';
import { handleActions } from 'redux-actions';

import Theme from 'utils/theme';
import Background from 'utils/background';
import ButtonColor from 'utils/buttonColor';

import {
  LOADING_ERROR,
  SET_DATA,
  UPDATE_CONFIG_DATA,
  SET_INSTAGRAM_FEED,
  SET_YOUTUBE_FEED,
  CATALOG_FILTER,
  CATALOG_ORDER,
  CATALOG_ORDER_CLEAR
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
  order: {},
  refs : {},
  catalogRef: null
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

    const refs = data.catalogItems.filter(e => e.storyGuid)
      .reduce((acc, e) => {
        if (!acc[e.storyGuid]) {
          acc[e.storyGuid] = { 
            guid: e.guid,
            ref: React.createRef() 
          }
        } 
        return acc;
      }, {});

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
      refs,
      catalogRef: React.createRef()
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
    const catalogRef = state.catalogRef;
    if (catalogRef) {
      catalogRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

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
  }

}, initialState);

export default reducer;
