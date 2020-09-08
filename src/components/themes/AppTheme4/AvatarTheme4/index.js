import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'components/common/Icon';
import addedAvatar from 'images/addedAvatar2.png';
import Button from 'components/common/Button';
import './index.scss';

const AvatarTheme4 = () => {
  const { currentTheme } = useSelector((state) => state.config);
  
  const detectMobile = () => {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i,
      /BlackBerry/i, /Windows Phone/i]; return toMatch.some((toMatchItem) => { return navigator.userAgent.match(toMatchItem); });
  }

  const { name, avatar, avatarPreview, url } = useSelector((state) => state.config.data);

  const onShare = () => {
    navigator.share({
      title: { name }, // Заголовок
      text: 'Установи мое приложение по этой ссылке', // Текст
      url: window.location.href, // ссылка
    });
  };

  return (
    <React.Fragment>
      <div className="avatar-theme4-flexbox" >
        <div className="user-name-theme4"  >{name || "Название бренда"}
          {detectMobile() ? " : Official App  "  : " : Official Website  "}
          {navigator.share &&
            <Button onClick={onShare} isInline className="tooltip-theme1">
              <Icon type="shareSquare" /></Button>}
        </div>
      </div>
      <div className="avatar-theme4"
        style={{ backgroundImage: !avatarPreview ? `URL(${avatar || addedAvatar})` :
        `URL(${avatar}), URL(${avatarPreview})` }} />
    </React.Fragment>
  );
};


export default AvatarTheme4;  
