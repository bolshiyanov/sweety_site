import { handleActions } from 'redux-actions';

import Theme from 'utils/theme';
import Background from 'utils/background';
import ButtonColor from 'utils/buttonColor';

import {
  LOADING_ERROR,
  SET_DATA,
  UPDATE_CONFIG_DATA,
  SET_INSTAGRAM_FEED,
  SET_YOUTUBE_FEED
} from 'constants/actions';

const defaultTheme = new Theme({ name: 'Default' });
const initialState = {
  error: null,
  data: null,
  themes: [defaultTheme],
  currentTheme: defaultTheme,
  backgrounds: [],
  buttonColors: [],
  config: {},
  account: {}
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

  [SET_INSTAGRAM_FEED]: (state, { data }) => ({
    ...state,
    instagramFeed: data
  }),

  [SET_YOUTUBE_FEED]: (state, { data }) => ({
    ...state,
    youTubeFeed: data
  })

}, initialState);

export default reducer;
