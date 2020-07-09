import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Accordeon from 'components/common/Accordeon';
import Picker from 'components/common/Picker';
import classnames from 'classnames';

import history from 'utils/history';

import {
  CHANGE_THEME,
  CHANGE_BACKGROUND,
  CHANGE_BUTTON_COLOR
} from 'constants/actions';

import './index.scss';

const HeaderTheme1 = ({ noConfig, avatar: propsAvatar, name: propsName, className }) => {
  const [configOpened, setConfigOpened] = useState(false);
  

  const { counter } = useSelector((state) => state.config.data);
  const [preOpened, setPreOpened] = useState(counter <= 2);

  const closeConfig = () => {
    setConfigOpened(false);
  };

  const openConfig = () => {
    setConfigOpened(true);
  };

  const openPayment = () => {
    history.push('/payment');
  };

  const openPayments = () => {
    history.push('/payments');
  };

  const {
    themes,
    currentTheme,
    backgrounds,
    buttonColors,
    data: {
      name: userName,
      avatar,
      settings: {
        background: selectedBackground,
        color: selectedButtonColor
      }
    }
  } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const onChangeTheme = (name) => {
    dispatch({ type: CHANGE_THEME, name });
  };

  const onChangeBackground = (name) => {
    dispatch({ type: CHANGE_BACKGROUND, name });
  };

  const onChangeButtonColor = (name) => {
    dispatch({ type: CHANGE_BUTTON_COLOR, name });
  };

  const themesElements = themes.map((theme) => ({
    id: theme.name,
    component: (
      <div
        onClick={() => onChangeTheme(theme.name)}
        style={theme.getThemePreviewStyles()}
        className="theme-picker"
      />
    )
  }));
  const { url, title } = useSelector((state) => state.config.account);
  
  const onShare = () => {
    navigator.share({
        title: {title}, // Заголовок
        text: 'Установи мое приложение по этой ссылке', // Текст
        url: {url}, // ссылка
      });
    };
;
  
  return (
    <React.Fragment>
      <header className={className}>
          <React.Fragment>
            {navigator.share && <Button onClick={onShare} isInline className={classnames["pulse2", "tooltip"]}>
          <Icon type="shareSquare" /></Button>}
          </React.Fragment>
      </header>
    </React.Fragment>
  );
};



export default HeaderTheme1;
