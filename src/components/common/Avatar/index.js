import React from 'react';
import PropTypes from 'prop-types';
import addedAvatar from 'images/addedAvatar2.png';


import './index.scss';

const Avatar = ({ image, imagePreview }) => {
  if (imagePreview)
    return <div className="avatar" style={{ backgroundImage: `URL(${image}), URL(${imagePreview})` }} />;
  if (!image)
    return <div className="avatar" style={{ backgroundImage: `URL(${addedAvatar})` }} />;
  return (
    <div className="avatar" style={{ backgroundImage: `URL(${image})` }} />
  );
};

Avatar.propTypes = {
  image: PropTypes.string
};

Avatar.defaultProps = {
  image: null
};

export default Avatar; 
