import React from 'react';


import { useSelector } from 'react-redux';
import CookieBanner from 'react-cookie-banner';
import HeaderTheme3 from 'components/themes/AppTheme3/HeaderTheme3';
import StoriesTheme3 from 'components/themes/AppTheme3/StoriesTheme3';
import AvatarTheme3 from 'components/themes/AppTheme3/AvatarTheme3';
import TitleTheme3 from 'components/themes/AppTheme3/TitleTheme3';
import BlocksTheme3 from 'components/themes/AppTheme3/BlocksTheme3';
import MessengersTheme3 from 'components/themes/AppTheme3/MessengersTheme3';
import Rss from 'components/Rss';
import Social from 'components/Social';
import Footer from 'components/Footer';
import { getInvite } from 'utils/api';
import PwaInstallIOs from "components/PwaInstallIOs";
import PwaInstall from "components/PwaInstall";
import SocialSharingButtons from "components/SocialSharingButtons";


import './index.scss';


const AppTheme3 = () => {
  const { data = {} } = useSelector((state) => state.config);
  const { currentTheme } = useSelector((state) => state.config);
  const { config } = useSelector((state) => state.config);
  

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

      <div className="app-theme3" style={backgroundStyles}>
        <div className="app-background-theme3" >
          <div className="app-container-theme3">
            <HeaderTheme3 />
            <StoriesTheme3 data={data.stories} /> 
            <AvatarTheme3 />
            <TitleTheme3 />
            <BlocksTheme3 data={data.blocks} />
            <MessengersTheme3 />
            <Rss />
            <SocialSharingButtons />
            <Social />
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default AppTheme3;