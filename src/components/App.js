import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import CookieBanner from 'react-cookie-banner';
import { StickyContainer, Sticky } from 'react-sticky';

import StartPwaInstallIos from 'components/StartPwaInstallIos';
import { useReactPWAInstall } from 'components/PwaInstall/component.js';
import { getPlatform } from "components/PwaInstall/platforms";

import Loading from 'components/common/Loading';

import Order from 'components/Order';
import HeaderTheme2 from 'components/themes/AppTheme2/HeaderTheme2';
import Messengers from 'components/Messengers';
import CatalogItemsTheme7 from 'components/themes/AppTheme7/CatalogItemsTheme7';
import CatalogItems from 'components/CatalogItems'; 
import Blocks from 'components/Blocks';
import Social from 'components/Social';
import FooterTheme2 from 'components/themes/AppTheme2/FooterTheme2';
import Title from 'components/Title';
import Admin from 'components/Admin';
import Landing from 'components/Landing';
import Rss from 'components/Rss';
import Start from 'components/Start';
import StoriesTheme6 from 'components/themes/AppTheme6/StoriesTheme6';
import StoriesTheme7 from 'components/themes/AppTheme7/StoriesTheme7';
import Pwaupbanner from 'components/Pwaupbanner';
import SocialSharingButtons from "components/SocialSharingButtons";
import AppTheme1 from "components/themes/AppTheme1";
import AppTheme2 from "components/themes/AppTheme2";
import AppTheme3 from "components/themes/AppTheme3";
import AppTheme4 from "components/themes/AppTheme4";
import AppTheme5 from "components/themes/AppTheme5";
import AppTheme6 from "components/themes/AppTheme6";
import AppTheme7 from "components/themes/AppTheme7";

import API from 'utils/api';
import { getSearchString } from 'utils/url';
import GoogleAnalytics from 'components/GoogleAnalytics';
import { __ } from 'utils/translation';

import { CONFIG_LOAD } from 'constants/actions';
import Subscriptions from './Subscriptions';

const App = () => {
  const dispatch = useDispatch();
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const { profile } = useParams();

  useEffect(() => {
    API.updateProfile(profile);

    dispatch({ type: CONFIG_LOAD, profile: profile });
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
  

  const nameTheme = currentTheme.name;

  const { settings = {} } = data;
  const styles = {
    banner: {
      postion: 'fixed',
      bottom: '35px',
      fontFamily: 'Source Sans Pro',
      height: 110,
      background: 'rgba(52, 64, 81, 0.88) url(/cookie.png) 20px 50% no-repeat',
      backgroundSize: '30px 30px',
      backgroundColor: '',
      fontSize: '14px',
      zIndex: 1000,
      fontWeight: 600
    },
    button: {
      border: '1px solid white',
      borderRadius: 4,
      height: 32,
      lineHeight: '32px',
      background: 'transparent',
      color: 'white',
      fontSize: '12px',
      fontWeight: 600,
      opacity: 1,
      right: 20,
      marginTop: -18,

    },
    message: {
      display: 'block',
      padding: '9px 67px',
      lineHeight: 1.2,
      textAlign: 'left',
      marginRight: 40,
      color: 'white'
    },
    link: {
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  };

  const backgroundStyles = currentTheme.getBackgroundStyles();

  const isDemo = getSearchString(window.location.search, 'demo') === "preview";
  const isDemoInstall = getSearchString(window.location.search, 'demo') === "install";
  if ((!isDemo && !supported() && !isInstalled()) || isDemoInstall)
    return <StartPwaInstallIos profile={profile} />;

  const needSticky = (data.stories?.length ?? 0) > 0 && (data.catalogItems?.length ?? 0) > 0;

  return (
    <React.Fragment>


      {nameTheme === "theme1" && (
        <AppTheme1 />
      )}
      {nameTheme === "theme2" && (
        <AppTheme2 />
      )}
      {nameTheme === "theme3" && (
        <AppTheme3 />
      )}
      {nameTheme === "theme4" && (
        <AppTheme4 />
      )}
      {nameTheme === "theme5" && (
        <AppTheme5 />
      )}
      {nameTheme === "theme6" && (
        <AppTheme6 />
      )}
      {nameTheme === "theme8" && (
        <AppTheme7 />
      )}
      {
        nameTheme !== "theme1" && nameTheme !== "theme2" &&
        nameTheme !== "theme3" && nameTheme !== "theme4" &&
        nameTheme !== "theme5" && nameTheme !== "theme6" &&
        nameTheme !== "theme8" && (
          <div className="app" style={backgroundStyles}>
            
            <div className="app-container">
              <GoogleAnalytics />
              <Order /> 
              <HeaderTheme2
                name={data.name}
                avatar={data.avatar}
                avatarPreview={data.avatarPreview}
                profile={profile} /> 
              <StoriesTheme6 data={data.stories} profile={profile} />
              <CatalogItemsTheme7 data={data.catalogItems} profile={profile} />
              {data.subscriptions && <Subscriptions data={data.subscriptions} />}
              <CatalogItems data={data.catalogItems} profile={profile} />
              <Blocks data={data.blocks} />
              <StoriesTheme7 data={data.stories} profile={profile} />
              {!needSticky && <div className="empty-box"></div>}
              <Title />
              <Messengers />
              <GoogleAnalytics />
              <Rss />
              <SocialSharingButtons />
              <Pwaupbanner profile={profile} />
              <Social />
              <FooterTheme2
                name={data.name} />
              {!isDemo && <div className="cookie-box" >
                <CookieBanner styles={styles}
                  message={__('Мы используем Cookies для Google analytics. Мы не собираем персональные данные')}
                  buttonMessage={__('Закрыть')}
                  link={<a href={__('https://ru.wikipedia.org/wiki/Cookie')} target="_blank">{__("Что это: COOKIES")}</a>}
                />
              </div>}
            </div>
          </div>

        )}

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