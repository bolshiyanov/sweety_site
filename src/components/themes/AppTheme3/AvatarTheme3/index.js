import React from 'react';
import { useSelector } from 'react-redux';
import addedAvatar from 'images/addedAvatar2.png';
import AvatarBase from 'components/common/AvatarBase';

import './index.scss';

const AvatarTheme3 = () => {
  const { avatar, avatarPreview } = useSelector((state) => state.config.data);

  return (
    <AvatarBase avatar={avatar} avatarPreview={avatarPreview} avatarDefault={addedAvatar} wrapperImageClass="avatar-theme3" wrapperVideoClass="avatar-video-theme3" />
  );
};

export default AvatarTheme3;
