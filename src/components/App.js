import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import '@pwabuilder/pwainstall';

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

import API from 'utils/api';
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

  if (!data)
    return <Loading />;

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
        <link rel="apple-touch-icon" href={`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/' }logo192.png`} />
        <link rel="icon" href={`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/' }logo192.png`} />
        <link rel="manifest" href={`${data.url}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/' }manifest.json`} />
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
        <link rel="icon" href="https://sweety.link/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="theme-color" content="#fff" /> 
        <meta name="author" content="Roman Bolshiyanov bolshiyanov@gmail.com" />
        <link rel="author" href="https://instagram.com/free_link_creator" />
        <meta name="date" content="May 01 2020 10:10 GMT" />
        <meta name="revisit-after" content="1 days" />
        <meta name="robots" content="all" />
        <meta property="og:type" content="website" />
        <meta property="og:video" content="https://youtu.be/zsy0pbMBBRI" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />     
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
          {profile !== 'za_ruku_k_yugu' ? null : <pwa-install />}
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
          <Rss />
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