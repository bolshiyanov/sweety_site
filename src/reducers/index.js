import { handleActions } from 'redux-actions';

import Theme from 'utils/theme';
import Background from 'utils/background';
import ButtonColor from 'utils/buttonColor';

import {
  LOADING_ERROR,
  SET_DATA,
  CHANGE_THEME,
  CHANGE_BACKGROUND,
  CHANGE_BUTTON_COLOR,
  EDIT_BLOCK,
  REMOVE_BLOCK,
  EDIT_MESSENGERS_DATA,
  EDIT_SOCIAL_DATA,
  UPDATE_CONFIG_DATA
} from 'constants/actions';

const defaultTheme = new Theme({ name: 'Default' });
const initialState = {
  error: null,
  data: null,
  themes: [defaultTheme],
  currentTheme: defaultTheme,
  backgrounds: [],
  buttonColors: []
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

  [CHANGE_THEME]: (state, { name }) => {
    const currentTheme = state.themes.find((theme) => name === theme.name) || { ...state.themes[0] };
    return {
      ...state,
      currentTheme,
      data: {
        ...state.data,
        settings: {
          ...state.data.settings,
          theme: name,
          background: undefined,
          button: undefined
        }
      }
    };
  },

  [CHANGE_BACKGROUND]: (state, { name }) => {
    const currentBackground = state.backgrounds.find((background) => name === background.name);
    const newTheme = new Theme({ ...state.currentTheme, background: currentBackground });

    return {
      ...state,
      currentTheme: newTheme,
      data: {
        ...state.data,
        settings: { ...state.data.settings, background: name }
      }
    };
  },

  [CHANGE_BUTTON_COLOR]: (state, { name }) => {
    const currentButtonColor = state.buttonColors.find((buttonColor) => name === buttonColor.name);
    const newTheme = new Theme({ ...state.currentTheme, button: currentButtonColor });

    return {
      ...state,
      currentTheme: newTheme,
      data: {
        ...state.data,
        settings: { ...state.data.settings, color: name }
      }
    };
  },

  [EDIT_BLOCK]: (state, { payload }) => {
    const currentBlock = state.data.blocks.find((block) => payload.guid === block.guid);
    const { blocks } = state.data;
    const order = blocks.reduce((result, block) => (block.order > result ? block.order : result), 0) + 1;

    if (!currentBlock) {
      return {
        ...state,
        data: {
          ...state.data,
          blocks: [...blocks, { ...payload, order }]
        }
      };
    }
    return {
      ...state,
      data: {
        ...state.data,
        blocks: blocks.map((block) => (block.guid === payload.guid ? payload : block))
      }
    };
  },

  [REMOVE_BLOCK]: (state, { guid }) => ({
    ...state,
    data: {
      ...state.data,
      blocks: state.data.blocks.filter((block) => block.guid !== guid)
    }
  }),

  [EDIT_SOCIAL_DATA]: (state, { data }) => ({
    ...state,
    data: {
      ...state.data,
      social: data
    }
  }),

  [EDIT_MESSENGERS_DATA]: (state, { data }) => ({
    ...state,
    data: {
      ...state.data,
      messengers: data
    }
  }),

  [UPDATE_CONFIG_DATA]: (state, { title, description }) => ({
    ...state,
    data: {
      ...state.data,
      title,
      description
    }
  })

}, initialState);

export default reducer;
