import React from 'react';

import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import CookieBanner from 'react-cookie-banner';
import Header from 'components/Header';
import StoriesTheme2 from 'components/themes/AppTheme2/StoriesTheme2';
import MessengersTheme2 from 'components/themes/AppTheme2/MessengersTheme2';
import TitleTheme2 from 'components/themes/AppTheme2/TitleTheme2';

import Blocks from 'components/Blocks';
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
      <Helmet>
        <html lang="Ru" amp />
        <title>{data.title || "Активная ссылка Sweety link"}</title>
        <meta name="description" content={data.description || "Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее"} />
        <link rel="canonical" href={data.url} />
        <meta property="og:site_name" content={data.name || "Free Link Creator"} />
        <meta property="og:url" content={data.url} />
        <meta property="og:locale" content={data.lang} />
        <meta property="og:type:profile:username" content={data.name || "Free Link Creator"} />
        <meta property="og:type:article:published_time" content={data.paymentData} />
        <meta property="og:image" content={data.title || "Активная ссылка Sweety link"} />
        <meta property="og:image:secure_url" content={`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/'}logo512.png`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:title" content={data.title || "Активная ссылка Sweety link"} />
        <meta property="og:description" content={data.description || "Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={data.url} />
        <meta name="twitter:title" content={data.title || "Активная ссылка Sweety link"} />
        <meta name="twitter:description" content={data.description || "Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее"} />
        <meta name="twitter:creator" content={data.name || "Free Link Creator"} />
        <meta name="twitter:image:src" content={`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/'}logo512.png`} />
        <meta name="twitter:domain" content={data.url} />
      </Helmet>
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
          <Blocks data={data.blocks} />
          <Rss />
          <SocialSharingButtons />
          <Social />
          <Footer />
        </div>
      </div>
    </React.Fragment>

  );
};

export default AppTheme2;