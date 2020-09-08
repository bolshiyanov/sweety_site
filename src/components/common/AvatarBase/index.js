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
  const [videoAvatar, setVideoAvatar] = useState(true);

  const detectIOs = () => {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i, /iMac/i]; return toMatch.some((toMatchItem) => { return navigator.userAgent.match(toMatchItem); });
  }

  return <React.Fragment>
    {detectIOs && avatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarDefault})` }} />}
    
    {!detectIOs && avatarPreview && !needPreview && videoAvatar && <div className={wrapperVideoClass}>
      <video className="avatar-video-base" poster={avatarPreview} preload="auto" autoplay="true" loop="true" muted="muted">
        <source src={avatar} onError={() => setVideoAvatar(false)}></source>
      </video>
    </div>}
    {!detectIOs && avatarPreview && (needPreview || !videoAvatar) && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarPreview}), URL(${avatarDefault})` }} />}
    {!detectIOs && !avatarPreview && avatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarDefault})` }} />}
    
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
  avatarDefault: null,
  needPreview: false
};

export default AvatarBase; 