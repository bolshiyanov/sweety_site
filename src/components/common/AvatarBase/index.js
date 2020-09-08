import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const AvatarBase = ({ 
    avatar, 
    avatarPreview, 
    avatarDefault, 
    wrapperImageClass, 
    wrapperVideoClass 
}) => {
  const [isVideoAvatar, setIsVideoAvatar] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const detectIOs = () => {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i, /iMac/i]; 
    return toMatch.some((toMatchItem) => { return navigator.userAgent.match(toMatchItem); });
  };

  useEffect(() => {
    setIsVideoAvatar((avatar?.endsWith(".mp4") ?? false) || (avatar?.startsWith("data:video") ?? false));
  }, [avatar]);

  const isIOs = detectIOs();

  return <React.Fragment>
    {isIOs && avatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar})` }} />}
    
    {!isIOs && avatarPreview && isVideoAvatar && !isVideoLoaded && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatarPreview})` }} />}
    {!isIOs && isVideoAvatar && <div className={wrapperVideoClass}>
      <video className="avatar-video-base" preload="auto" autoplay="true" loop="true" muted="muted"
        onLoadedData={() => {
          setIsVideoLoaded(true);
        }}>
        <source src={avatar} onError={() => setIsVideoAvatar(false)}></source>
      </video>
    </div>}
    {!isIOs && !avatarPreview && avatar && !isVideoAvatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar})` }} />}
    {!isIOs && avatarPreview && !isVideoAvatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarPreview})` }} />}    
    {!avatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatarDefault})` }} />}
  </React.Fragment>
};

AvatarBase.propTypes = {
  avatar: PropTypes.string,
  avatarPreview: PropTypes.string,
  avatarDefault: PropTypes.string
};

AvatarBase.defaultProps = {
  avatar: null,
  avatarPreview: null,
  avatarDefault: null
};

export default AvatarBase; 