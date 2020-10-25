import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import CookieBanner from 'react-cookie-banner';
import { StickyContainer, Sticky } from 'react-sticky';

import StartPwaInstallIos from 'components/StartPwaInstallIos';
import { useReactPWAInstall } from 'components/PwaInstall/component.js';

import Loading from 'components/common/Loading';
import Pwaupbanner from 'components/Pwaupbanner'; 
import Order from 'components/Order';
import HeaderTheme6 from 'components/themes/AppTheme6/HeaderTheme6';
import AvatarTheme3 from 'components/themes/AppTheme3/AvatarTheme3';
import TitleTheme6 from 'components/themes/AppTheme6/TitleTheme6';
import Stories from 'components/Stories';
import Messengers from 'components/Messengers';
import CatalogItems from 'components/CatalogItems';
import Blocks from 'components/Blocks';
import Social from 'components/Social';
import Footer from 'components/Footer';
import Admin from 'components/Admin';
import Landing from 'components/Landing';
import Rss from 'components/Rss';
import Start from 'components/Start';
import SocialSharingButtons from "components/SocialSharingButtons";
import API from 'utils/api';
import { getSearchString } from 'utils/url';
import GoogleAnalytics from 'utils/googleAnalytics';
import {__} from 'utils/translation';

import { CONFIG_LOAD } from 'constants/actions';

const AppTheme6 = () => {
  const dispatch = useDispatch();
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
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

  var isDemo = getSearchString(window.location.search, 'demo') === "preview";
  if (!isDemo && supported() && !isInstalled())
    return <StartPwaInstallIos profile={profile} />;

  const needSticky = (data.stories?.length ?? 0) > 0 && (data.catalogItems?.length ?? 0) > 0;

  return (
    <React.Fragment>
      
      <div className="app" style={backgroundStyles}>
        {GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker />}
        <div className="app-container">
          <Pwaupbanner profile={profile} />
          <Order />
          <HeaderTheme6 />
          <AvatarTheme3 />
          <TitleTheme6 />
          {needSticky && <StickyContainer>
            <Sticky>
              {({
                  style,
                  isSticky,
                  distanceFromBottom 
              }) => {
                const stickyBlock = isSticky || (distanceFromBottom ?? 0) < 0;
                return (<div id="sticky" style={!stickyBlock ? {} : {...backgroundStyles, ...style, zIndex: 10}}>
                  <Stories data={data.stories} />
                </div>);
              }}
            </Sticky>
            <CatalogItems data={data.catalogItems} profile={profile} />
          </StickyContainer>}
          {!needSticky && <>
            <Stories data={data.stories} />
            <CatalogItems data={data.catalogItems} profile={profile} />
          </>}
          <Blocks data={data.blocks} />
          {data.ads && data.ads.length !== 0 && <Blocks data={data.ads} referrerTitle={data?.referrer?.title} />}
          <Messengers />
          <Rss />
          <SocialSharingButtons />
          <Social />
          <Footer />
          {!isDemo && <div className="cookie-box" >
            <CookieBanner styles={styles}
              message={__('Мы используем Cookies для Google analytics. Мы не собираем персональные данные')}
              buttonMessage={__('Закрыть')}
              link={<a href={__('https://ru.wikipedia.org/wiki/Cookie')} target="_blank">{__("Что это: COOKIES")}</a>}
            />
          </div>}
        </div>
      </div>
    </React.Fragment>
  );
};
const Router = () => (
  <Switch>
    <Route path="/start" component={Start} />
    <Route path="/:profile/admin" component={Admin} />
    <Route path="/:profile" component={AppTheme6} />
    <Route component={Landing} />
  </Switch>
);

export default Router;
