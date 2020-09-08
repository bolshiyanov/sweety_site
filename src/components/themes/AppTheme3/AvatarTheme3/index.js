import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import addedAvatar from 'images/addedAvatar2.png';
 
import './index.scss';

const AvatarTheme3 = () => {
  const { avatar, avatarPreview } = useSelector((state) => state.config.data);

  return (
    <React.Fragment>
      <div className="avatar-theme3"
        style={{ backgroundImage: !avatarPreview ? `URL(${avatar || addedAvatar})` :
          `URL(${avatar}), URL(${avatarPreview})` }}
        />
    </React.Fragment>
  );
};





AvatarTheme3.propTypes = {
  image: PropTypes.string
};

AvatarTheme3.defaultProps = {
  image: '',
};

export default AvatarTheme3;
