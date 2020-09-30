import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import CookieBanner from 'react-cookie-banner';
import StartPwaInstallIos from 'components/StartPwaInstallIos';
import { useReactPWAInstall } from 'components/PwaInstall/component.js';
import { getPlatform } from "components/PwaInstall/platforms";

import Loading from 'components/common/Loading';

import Order from 'components/Order';
import Header from 'components/Header';
import Messengers from 'components/Messengers';
import CatalogItems from 'components/CatalogItems';
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
import GoogleAnalytics from 'utils/googleAnalytics';
import {__} from 'utils/translation';

import { CONFIG_LOAD } from 'constants/actions';

const App = () => {
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

  const isDemo = getSearchString(window.location.search, 'demo') === "preview";
  const isDemoInstall = getSearchString(window.location.search, 'demo') === "install";
  if ((!isDemo && supported() && !isInstalled()) || isDemoInstall)
    return <StartPwaInstallIos profile={profile} />;

  return (
    <React.Fragment>
      <Helmet>
        <html lang="Ru" amp />
        <title>{data.title || __("Конструктор мобильных приложений Sweety")}</title>
        <meta name="description" content={data.description || __("Мобильное приложение для IOS, Android или Windows создай сам в конструкторе SWEETY за 10 минут, без программистов, без регистрации, без подписок, всего за 9999 рублей навсегда, чтобы увеличить количество повторных обращений ваших клиентов до 300%. БОНУС: 4 часа выделеннной техподдержки,  для тех кому нужно мобильное приложение ПОД КЛЮЧ")} />
        <link rel="canonical" href={data.url} />
        <meta property="og:site_name" content={data.name || __("Конструктор мобильных приложений Sweety")} />
        <meta property="og:url" content={data.url} />
        <meta property="og:locale" content={data.lang} />
        <meta property="og:type:profile:username" content={data.name || __("Конструктор мобильных приложений Sweety")} />
        <meta property="og:type:article:published_time" content={data.paymentData} />
        <meta property="og:image" content={data.title || __("Конструктор мобильных приложений Sweety")} />
        <meta property="og:image:secure_url" content={`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/'}logo512.png`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:title" content={data.title || __("Конструктор мобильных приложений Sweety")} />
        <meta property="og:description" content={data.description || __("Мобильное приложение для IOS, Android или Windows создай сам в конструкторе SWEETY за 10 минут, без программистов, без регистрации, без подписок, всего за 9999 рублей навсегда, чтобы увеличить количество повторных обращений ваших клиентов до 300%. БОНУС: 4 часа выделеннной техподдержки,  для тех кому нужно мобильное приложение ПОД КЛЮЧ")} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={data.url} />
        <meta name="twitter:title" content={data.title || __("Конструктор мобильных приложений Sweety")} />
        <meta name="twitter:description" content={data.description || __("Мобильное приложение для IOS, Android или Windows создай сам в конструкторе SWEETY за 10 минут, без программистов, без регистрации, без подписок, всего за 9999 рублей навсегда, чтобы увеличить количество повторных обращений ваших клиентов до 300%. БОНУС: 4 часа выделеннной техподдержки,  для тех кому нужно мобильное приложение ПОД КЛЮЧ")} />
        <meta name="twitter:creator" content={data.name || __("Конструктор мобильных приложений Sweety")} />
        <meta name="twitter:image:src" content={`${data.url.replace('https://sweety.link/', 'https://sweety.link/content/img/')}${data.url && data.url[data.url.length - 1] === '/' ? '' : '/'}logo512.png`} />
        <meta name="twitter:domain" content={data.url} />
      </Helmet>

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
            {GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker />}
            <div className="app-container">
              <Pwaupbanner profile={profile} />
              <Order />
              <Header
                name={data.name}
                avatar={data.avatar}
                avatarPreview={data.avatarPreview}
                profile={profile}
              />
              <Stories data={data.stories} profile={profile} />
              <Title />
              <Messengers />
              <CatalogItems data={data.catalogItems} profile={profile} />
              <Blocks data={data.blocks} />
              {data.ads && data.ads.length !== 0 && <Blocks data={data.ads} referrerTitle={data?.referrer?.title} />}
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