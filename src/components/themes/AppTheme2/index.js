import React from 'react';


import { useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import CookieBanner from 'react-cookie-banner';
import Header from 'components/Header';
import StoriesTheme2 from 'components/themes/AppTheme2/StoriesTheme2';
import MessengersTheme2 from 'components/themes/AppTheme2/MessengersTheme2';
import TitleTheme2 from 'components/themes/AppTheme2/TitleTheme2';

import BlocksTheme2 from 'components/themes/AppTheme2/BlocksTheme2';
import Rss from 'components/Rss';
import SocialSharingButtons from "components/SocialSharingButtons";
import Social from 'components/Social';
import Footer from 'components/Footer';
import { getInvite } from 'utils/api';
import PwaInstall from "components/PwaInstall";
import PwaInstallIOs from "components/PwaInstallIOs";

import './index.scss';


const AppTheme2 = () => {
  const { data = {} } = useSelector((state) => state.config);
  const { currentTheme } = useSelector((state) => state.config);
  const { config } = useSelector((state) => state.config);
  const { profile } = useParams();

  const { settings = {} } = data;
  const { constructor } = config;
  const backgroundStyles = currentTheme.getBackgroundStyles();
  const inviteId = getInvite();

  const ua = navigator.userAgent || navigator.vendor || navigator.opera;
  if (ua.indexOf("Instagram") > -1 && !(ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
    window.location.href = `https://api.sweety.link/redirect/dummy/?invitationId=${inviteId}`;
    return null;
  }

  return (
    <React.Fragment>

      <div className="app-theme2" style={backgroundStyles}>
          <div className="app-container-theme2">
          <Header
                name={data.name}
                avatar={data.avatar}
                profile={profile}
              />
            <StoriesTheme2 data={data.stories} />
            <MessengersTheme2 />
            <TitleTheme2 />
            <BlocksTheme2 data={data.blocks} />
            <Rss />
            <SocialSharingButtons />
            <PwaInstall  />
            <PwaInstallIOs  />
            <Social />
            <Footer />
          </div>
      </div>
    </React.Fragment>

  );
};

export default AppTheme2;