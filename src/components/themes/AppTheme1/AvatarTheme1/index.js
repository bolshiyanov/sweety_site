import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import addedAvatar from 'images/imageTheme1.png';
import './index.scss';

const AvatarTheme1 = () => {
  const [data, setData] = useState({ name: '', avatar: ''});

  const {  name, avatar } = useSelector((state) => state.config.data);
  
    return (
      <React.Fragment>
      <div className="user-name-theme1"  >{name || "Theme 1"}&nbsp;: Official App </div>    
      <div className="avatar-theme1"
       style={{ backgroundImage: `URL(${data.avatar || addedAvatar})` }}  />
       </React.Fragment>
  );
};


export default AvatarTheme1;
