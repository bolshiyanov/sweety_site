import React from 'react';
import { useSelector } from 'react-redux';

import addedAvatar from 'images/addedAvatar2.png';
import AvatarBase from 'components/common/AvatarBase';

import './index.scss';

const AvatarTheme5 = () => {
  const { name, avatar, avatarPreview, url } = useSelector((state) => state.config.data);

  return (
    <React.Fragment>
      <div className="avatar-theme5-flexbox"  >
        <div className="user-name-theme5"  >{name || "Название бренда"}
        </div>
      </div>

      <AvatarBase avatar={avatar} avatarPreview={avatarPreview} avatarDefault={addedAvatar} wrapperImageClass="avatar-theme5" wrapperVideoClass="avatar-video-theme5" />
    </React.Fragment>
  );
};


export default AvatarTheme5;  
