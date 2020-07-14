import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import addedAvatar from 'images/ImageTheme3_1.png';
 
import './index.scss';

const AvatarTheme3 = () => {
  const [data, setData] = useState({ name: '', avatar: '' });

  const { avatar } = useSelector((state) => state.config.data);

 

  return (
    <React.Fragment>
      <div className="avatar-theme3"
        style={{ backgroundImage: `URL(${avatar || addedAvatar})` }}
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
