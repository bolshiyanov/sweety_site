import React from 'react';

import { useSelector } from 'react-redux';
import CookieBanner from 'react-cookie-banner';
import StoriesTheme1 from 'components/themes/AppTheme1/StoriesTheme1';

import { getInvite } from 'utils/api';
import TitleTheme3 from 'components/themes/AppTheme3/TitleTheme3';
import BlocksTheme3 from 'components/themes/AppTheme3/BlocksTheme3';
import MessengersTheme3 from 'components/themes/AppTheme3/MessengersTheme3';
import Rss from 'components/Rss';

import AvatarTheme1 from 'components/themes/AppTheme1/AvatarTheme1';

import './index.scss';

const AppTheme1 = () => {
  const { data = {} } = useSelector((state) => state.config);
  const { currentTheme } = useSelector((state) => state.config);
  const { config } = useSelector((state) => state.config);
  const { active } = useSelector((state) => state.config.account);

  const { settings = {} } = data;
  const { avatar } = config;

  const backgroundStyles = currentTheme.getBackgroundStyles();
  const inviteId = getInvite();

  const ua = navigator.userAgent || navigator.vendor || navigator.opera;
  if (ua.indexOf("Instagram") > -1 && !(ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
    window.location.href = `https://api.sweety.link/redirect/dummy/?invitationId=${inviteId}`;
    return null;
  }



  return (
    <div className="app-theme1" style={backgroundStyles}>
      <div className="app-background-theme1" >
        <div className="app-container-theme1">
         
          <AvatarTheme1 image={avatar} />
          <StoriesTheme1 data={data.stories} />
          <TitleTheme3 />
          <BlocksTheme3 data={data.blocks} />
          <Rss />
          <MessengersTheme3 />
        </div>
      </div>
    </div>
  );
};

export default AppTheme1;