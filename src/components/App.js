import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import Loading from 'components/common/Loading';

import Header from 'components/Header';
import Notification from 'components/Notification';
import Messengers from 'components/Messengers';
import Blocks from 'components/Blocks';
import Social from 'components/Social';
import Footer from 'components/Footer';
import Title from 'components/Title';
import Admin from 'components/Admin';
import Landing from 'components/Landing';
import Rss from 'components/Rss';
import Start from 'components/Start';
import Stories from 'components/Stories';
import PwaInstall from "components/PwaInstall";
import PwaInstallIOs from "components/PwaInstallIOs";
import SocialSharingButtons from "components/SocialSharingButtons";

import API from 'utils/api';
import { getUrl } from 'utils/url';
import GoogleAnalytics from 'utils/googleAnalytics';

import { CONFIG_LOAD } from 'constants/actions';

const App = () => {
  const dispatch = useDispatch();

  const { profile } = useParams();

  useEffect(() => {
    API.updateProfile(profile);

    dispatch({ type: CONFIG_LOAD });
  }, []); // eslint-disable-line

  const { data = {} } = useSelector((state) => state.config);
  const { currentTheme } = useSelector((state) => state.config);

  const ua = navigator.userAgent || navigator.vendor || navigator.opera;
  if (ua.indexOf("Instagram") > -1 && !(ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
    window.location.href = `https://api.sweety.link/redirect/dummy/${profile}`;
    return null;
  }

  if (!data) {
    return <Loading />;
  }

  const { settings = {} } = data;

  const backgroundStyles = currentTheme.getBackgroundStyles();
  return (
    <React.Fragment>
      <Helmet>
        <html lang="Ru" amp /> 
        <title>{data.title || "Активная ссылка Sweety link"}</title>
        <meta name="description" content={data.description || "Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее"} />
        <link rel="canonical" href={data.url} />
        <meta property="og:site_name" content={data.name || "Free Link Creator"} />
        <meta property="og:url" content={data.url}/>
        <meta property="og:locale" content={data.lang} />
        <meta property="og:type:profile:username" content={data.name || "Free Link Creator"} />
        <meta property="og:type:article:published_time" content={data.paymentData} />
        <meta property="og:image" content={data.title || "Активная ссылка Sweety link"} />
        <meta property="og:image:secure_url" content={`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/' }logo512.png`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:title"  content={data.title || "Активная ссылка Sweety link"} />  
        <meta property="og:description" content={data.description || "Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={data.url} />
        <meta name="twitter:title" content={data.title || "Активная ссылка Sweety link"} /> 
        <meta name="twitter:description" content={data.description || "Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее"} />
        <meta name="twitter:creator" content={data.name || "Free Link Creator"} />
        <meta name="twitter:image:src" content= {`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/' }logo512.png`} />
        <meta name="twitter:domain" content={data.url} />
      </Helmet>
      <div className="app" style={backgroundStyles}>
        { GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker /> }
        <div className="app-background" >
        <div className="app-container">
          <Header
            name={data.name}
            avatar={data.avatar}
            profile={profile}
          />
          <Notification
            link={data.url}
            message={settings.advanced}
            url={settings.advancedLink}
            buttonTitle={settings.advancedTitle}
            profile={profile}
          />
          
          <Stories data={data.stories} profile={profile} />
          <Title />
          <Messengers />
          <Blocks data={data.blocks} />
          {data.ads && data.ads.length !== 0 && <Blocks data={data.ads} referrerTitle={data?.referrer?.title} />}
          <SocialSharingButtons />
          <Rss />
          <PwaInstall profile={profile} />
          <PwaInstallIOs profile={profile} />
          <Social />
          <Footer />
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const Router = () => (
  <Switch>
    <Route path="/start" component={Start} />
    <Route path="/:profile/admin" component={Admin} />
    <Route path="/:profile" component={App} />
    <Route component={Landing} />
  </Switch>
);

export default Router;