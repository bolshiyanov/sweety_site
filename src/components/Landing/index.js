import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Swiper from 'react-id-swiper';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';
import CookieBanner from 'react-cookie-banner';
import { Animated } from "react-animated-css";

import Button from 'components/common/Button';
import Slider from 'components/common/Slider';
import Loading from 'components/common/Loading';

import Header from 'components/Header';
import Start from 'components/Landing/Start';

import Slide1 from 'components/Landing/Animation/Slide1.js';
import Slide2 from 'components/Landing/Animation/Slide2.js';
import Slide3 from 'components/Landing/Animation/Slide3.js';
import Slide4 from 'components/Landing/Animation/Slide4.js';
import Slide5 from 'components/Landing/Animation/Slide5.js';
import Slide6 from 'components/Landing/Animation/Slide6.js';
import Slide7 from 'components/Landing/Animation/Slide7.js';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';

import API, { getAdminSite, getRef, getCookieDomain } from 'utils/api';
import { getSearchString } from 'utils/url';
import { event } from 'utils/googleAnalytics';
import { __ } from 'utils/translation';

import logoSweety from 'images/sweetylogo.png';

import 'swiper/swiper.scss';
import { truncate } from 'lodash';
// import history from 'utils/history';

const Landing = () => {
  const [_, setCookie] = useCookies();

  const [startOpened, setStartOpened] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const startUrl = 'https://dash.sweety.link'
  const closeStart = useCallback(() => {
    setStartOpened(false);
  }, [setStartOpened]);

  const openStart = useCallback(() => {
    setStartOpened(true);
  }, [setStartOpened]);

  // useEffect(() => {
  //   history.push('/es');
  // }, []);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setCurrentPage(swiper.realIndex);
      });
      swiper.on('touchEnd', () => {
        setTimeout(() => {
          if (swiper.isEnd) {
            startClick();
          }
        }, 100);
      });
    }
  }, [swiper]);

  const handleClick = useCallback(() => {
    if (swiper) {
      if (!swiper.isEnd) {
        swiper.slideNext(500);
      }
    }
  }, [swiper]);

  const startClick = () => {
    API.register({
      referer: getRef()
    }).then((response) => {
      if (response?.invitationId) {
        event("signup", "instagram", getRef());
        setCookie(response.siteUrl.substring(response.siteUrl.indexOf('/') + 1),
          response.invitationId, { path: '/' });
        setCookie('lastId', response.invitationId, { path: '/', domain: getCookieDomain() });

        window.location.href = getAdminSite(response.invitationId);
      }
      else if (response?.siteUrl) {
        window.location.href = getAdminSite();
      }
    });
  };

  useEffect(() => {
    if (getRef() !== undefined) {
      startClick();
    }
  }, []);

  if (getRef() !== undefined) {
    return <Loading />;
  }

  const styles = {
    banner: {
      fontFamily: 'Source Sans Pro',
      height: 110,
      background: 'rgba(52, 64, 81, 0.95) url(/cookie.png) 20px 50% no-repeat',
      backgroundSize: '30px 30px',
      backgroundColor: '',
      fontSize: '15px',
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
      lineHeight: 1.3,
      textAlign: 'left',
      marginRight: 40,
      color: 'white'
    },
    link: {
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <html lang="en, ru, es, fr, de, it" amp />
        <title>{__('Бесплатный конструктор PWA')}</title>
        <meta name="description" content={__('Бесплатно создавайте прогрессивное веб-приложение для IOS, Android или Windows самостоятельно в конструкторе SWEETY за 10 минут, без программистов, без регистрации, без подписок, бесплатно, чтобы увеличить количество повторных запросов от ваших клиентов до 300% ')} />
        <link rel="canonical" href="https://sweety.link" />
        <meta property="og:site_name" content={__('Бесплатный конструктор PWA')} />
        <link rel="apple-touch-icon" href="https://sweety.link/logo192.png" />
        <link rel="icon" href="https://sweety.link/logo192.png" />
        <link rel="manifest" href="https://sweety.link/manifest.json" />
        <meta property="og:url" content="https://sweety.link/" />
        <meta property="og:locale" content="https://sweety.link/" />
        <meta property="og:type:profile:username" content={__('Бесплатный конструктор PWA')} />
        <meta property="og:type:article:published_time" content="May 01 2020 10:12 GMT" />
        <meta property="og:image" content={__('Бесплатный конструктор PWA')} />
        <meta property="og:image:secure_url" content="https://sweety.link/logo512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:title" content="PWA builder Sweety" />
        <meta property="og:description" content={__('Бесплатно создавайте прогрессивное веб-приложение для IOS, Android или Windows самостоятельно в конструкторе SWEETY за 10 минут, без программистов, без регистрации, без подписок, бесплатно, чтобы увеличить количество повторных запросов от ваших клиентов до 300% ')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://sweety.link" />
        <meta name="twitter:title" content="PWA builder Sweety" />
        <meta name="twitter:description" content={__('Бесплатно создавайте прогрессивное веб-приложение для IOS, Android или Windows самостоятельно в конструкторе SWEETY за 10 минут, без программистов, без регистрации, без подписок, бесплатно, чтобы увеличить количество повторных запросов от ваших клиентов до 300% ')} />
        <meta name="twitter:creator" content={__('Бесплатный конструктор PWA')} />
        <meta name="twitter:image:src" content="https://sweety.link/logo512.png/logo512.png" />
        <meta name="twitter:domain" content="https://sweety.link/logo512.png" />
        <link rel="icon" href="https://sweety.link/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="theme-color" content="#fff" />
        <meta name="author" content="Roman Bolshiyanov bolshiyanov@gmail.com" />
        <link rel="author" href="https://instagram.com/sweety_app_creator" />
        <meta name="date" content="May 01 2020 10:10 GMT" />
        <meta name="revisit-after" content="1 days" />
        <meta name="robots" content="all" />
        <meta property="og:type" content="website" />
        <meta property="og:video" content="https://youtu.be/zsy0pbMBBRI" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      </Helmet>
      <div className="main-page">
        <div className="main-page-logoBox">
          <div className="main-page-logoBox__logo" style={{ backgroundImage: `URL(${logoSweety})` }} />
        </div>
        <Swiper getSwiper={setSwiper}>
          <div onClick={handleClick} className="main-page__page1" >

            <div className="main-page__page1__container-anime"><Slide1 /></div>
            <div className="main-page__page1__container-anime-center">
              <div className="main-page__page1__container-anime-dilimeter"></div>
              <div className="main-page__page1__container-anime-box-image"><Slide3 /></div>
              <div className="main-page__page1__container-anime-dilimeter"></div>
            </div>
            <div className="main-page__page1__container-anime__text1-flexBox">
              <div className="main-page__page1__container-anime__text1-flexBox__text1">
                <h1>{__('Создайте бесплатно свое PWA за 10 минут')}</h1>
              </div>
            </div>
            <div className="main-page__page1__container-anime"><Slide2 /></div>
            <div className="main-page__page1__container-anime"><Slide5 /></div>
            <div className="main-page__page1__container-anime"><Slide6 /></div>

            <div className="main-page__page1__container1">
              <h2 className="main-page__page1__header"><Slide4 /></h2>
            </div>

            <div className="main-page__page1__container1">
              <h2 className="main-page__page1__header"><Slide7 /></h2>
            </div>
          </div>
          <div className="main-page__page">
            <Loading />
          </div>
        </Swiper>

        <div className="main-page__footer">

          <div className="cookie-box" >
            <CookieBanner styles={styles}
              message={__('Мы используем Cookies для Google analytics. Мы не собираем персональные данные')}
              buttonMessage={__('Закрыть')}
              link={<a href={__('https://ru.wikipedia.org/wiki/Cookie')} target="_blank">{__("Что это: COOKIES")}</a>}
            />
          </div>

          <Start />

          <div className="footer-brends-box-items-landing">
            
          </div>
          <a href={startUrl} className="textlogofooter" target="_blank" rel="noopener noreferrer" >TRY IT FREE&reg;SWEETY</a> <br /><br />
        </div>

      </div>

    </React.Fragment>
  );
};

export default Landing;
