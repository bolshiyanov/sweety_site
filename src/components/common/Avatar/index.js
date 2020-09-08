import React from 'react';
import PropTypes from 'prop-types';
import addedAvatar from 'images/addedAvatar2.png';
import AvatarBase from 'components/common/AvatarBase';

import './index.scss';

const Avatar = ({ image, imagePreview }) => {
  return <AvatarBase avatar={imagePreview ?? image} avatarDefault={addedAvatar} wrapperImageClass="avatar" wrapperVideoClass="avatar-video" />
};

Avatar.propTypes = {
  image: PropTypes.string
};

Avatar.defaultProps = {
  image: null
};

export default Avatar; 
