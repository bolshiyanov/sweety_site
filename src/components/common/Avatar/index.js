import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Avatar = ({ image }) => {
  if (!image)
    return null;

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
