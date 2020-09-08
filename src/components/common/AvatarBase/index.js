import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const AvatarBase = ({ 
    avatar, 
    avatarPreview, 
    avatarDefault, 
    wrapperImageClass, 
    wrapperVideoClass 
}) => {
  const [isVideoAvatar, setIsVideoAvatar] = useState(avatar?.endsWith(".mp4") ?? false);

  const detectIOs = () => {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i, /iMac/i]; 
    return toMatch.some((toMatchItem) => { return navigator.userAgent.match(toMatchItem); });
  };

  const isIOs = detectIOs();

  return <React.Fragment>
    {isIOs && avatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarDefault})` }} />}
    
    {!isIOs && isVideoAvatar && <div className={wrapperVideoClass}>
      <video className="avatar-video-base" poster={avatarPreview} preload="auto" autoplay="true" loop="true" muted="muted">
        <source src={avatar} onError={() => setIsVideoAvatar(false)}></source>
      </video>
    </div>}
    {!isIOs && avatarPreview && !isVideoAvatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarPreview}), URL(${avatarDefault})` }} />}
    {!isIOs && !avatarPreview && avatar && !isVideoAvatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarDefault})` }} />}
    
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