import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'components/common/Icon';
import addedAvatar from 'images/addedAvatar2.png';
import Button from 'components/common/Button';
import './index.scss';

const AvatarTheme5 = () => {
  const { currentTheme } = useSelector((state) => state.config);

  const { name, avatar, avatarPreview, url } = useSelector((state) => state.config.data);

  return (
    <React.Fragment>
      <div className="avatar-theme5-flexbox"  >
        <div className="user-name-theme5"  >{name || "Название бренда"}
         
        </div>
      </div>
      <div className="avatar-theme5"
        style={{ backgroundImage: !avatarPreview ? `URL(${avatar || addedAvatar})` :
        `URL(${avatar}), URL(${avatarPreview})` }} />
    </React.Fragment>
  );
};


export default AvatarTheme5;  
