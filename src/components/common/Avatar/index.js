import React from 'react';
import PropTypes from 'prop-types';
import addedAvatar from 'images/ImageTheme3_1.png';


import './index.scss';

const Avatar = ({ image }) => {
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
