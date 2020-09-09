import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getSearchString } from 'utils/url';

import './index.scss';

const AvatarBase = ({ 
    avatar, 
    avatarPreview, 
    avatarDefault, 
    wrapperImageClass, 
    wrapperVideoClass 
}) => {
  const [isVideoAvatar, setIsVideoAvatar] = useState(false);

  const detectIOs = () => {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i, /iMac/i]; 
    return toMatch.some((toMatchItem) => { return navigator.userAgent.match(toMatchItem); });
  };

  var isSnapshot = getSearchString(window.location.search, 'snapshot') === "";

  useEffect(() => {
    setIsVideoAvatar((avatar?.endsWith(".mp4") ?? false) || (avatar?.startsWith("data:video") ?? false));
  }, [avatar]);

  const isIOs = !isSnapshot && detectIOs();

  return <React.Fragment>
    {isIOs && avatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar})` }} />}
    
    {isSnapshot && avatarPreview && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatarPreview})` }} />}
    {!isIOs && (!isSnapshot || !avatarPreview) && isVideoAvatar && <div className={wrapperVideoClass}>
      <video className="avatar-video-base" poster={avatarPreview} preload="auto" autoplay="true" loop="true" muted="muted">
        <source src={avatar} onError={() => setIsVideoAvatar(false)}></source>
      </video>
    </div>}
    {!isSnapshot && !isIOs && avatarPreview && !isVideoAvatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar}), URL(${avatarPreview})` }} />}    

    {!isIOs && !avatarPreview && avatar && !isVideoAvatar && <div className={wrapperImageClass} style={{ backgroundImage: `URL(${avatar})` }} />}
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