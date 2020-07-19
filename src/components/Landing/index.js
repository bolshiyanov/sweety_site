import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Swiper from 'react-id-swiper';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';
import CookieBanner from 'react-cookie-banner';
import { Animated } from "react-animated-css";

import Headerlanding from 'components/Headerlanding'; 
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

import API, { getAdminSite, getRef, getCookieDomain } from 'utils/api';
import { event } from 'utils/googleAnalytics';

import referrerAvatar from 'images/sweetylogo.png';
import backgroundImage2 from 'images/main-background2.jpg';
import backgroundImage3 from 'images/main-background3.jpg';
import backgroundImage4 from 'images/main-background4.jpg';
import backgroundImage5 from 'images/main-background5.jpg';
import backgroundImage6 from 'images/main-background6_1.jpg';
import backgroundImage7 from 'images/main-background7_1.jpg';

import 'swiper/swiper.scss';
import { truncate } from 'lodash';

const Landing = () => {
  const [_, setCookie] = useCookies();

  const [startOpened, setStartOpened] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const closeStart = useCallback(() => {
    setStartOpened(false);
  }, [setStartOpened]);

  const openStart = useCallback(() => {
    setStartOpened(true);
  }, [setStartOpened]);

  const referrer = {
    title: "Будь ближе к подписчикам",
    avatar: referrerAvatar
  }

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
        <html lang="ru" amp />
        <title>Активная ссылка Sweety link</title>
        <meta name="description" content="Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее" />
        <link rel="canonical" href="https://sweety.link" />
        <meta property="og:site_name" content="Free Link Creator" />
        <link rel="apple-touch-icon" href="https://sweety.link/logo192.png" />
        <link rel="icon" href="https://sweety.link/logo192.png" />
        <link rel="manifest" href="https://sweety.link/manifest.json" />
        <meta property="og:url" content="https://sweety.link/" />
        <meta property="og:locale" content="https://sweety.link/" />
        <meta property="og:type:profile:username" content="Free Link Creator" />
        <meta property="og:type:article:published_time" content="May 01 2020 10:12 GMT" />
        <meta property="og:image" content="Free Link Creator" />
        <meta property="og:image:secure_url" content="https://sweety.link/logo512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:title" content="Активная ссылка Sweety link" />
        <meta property="og:description" content="Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://sweety.link" />
        <meta name="twitter:title" content="Активная ссылка Sweety link" />
        <meta name="twitter:description" content="Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее" />
        <meta name="twitter:creator" content="Free Link Creator" />
        <meta name="twitter:image:src" content="https://sweety.link/logo512.png/logo512.png" />
        <meta name="twitter:domain" content="https://sweety.link/logo512.png" />
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
      <div className="main-page">
        {/* <Headerlanding className="main-page__header" avatar={referrer.avatar} name={referrer.title} noConfig /> */}
        <Swiper getSwiper={setSwiper}>
          <div onClick={handleClick} className="main-page__page1" >

            <div className="main-page__page1__container-anime"><Slide1 /></div> 
            <div className="main-page__page1__container-anime-center">
              <div className="main-page__page1__container-anime-dilimeter"></div>
              <div className="main-page__page1__container-anime-box-image"><Slide3 /></div>
              <div className="main-page__page1__container-anime-dilimeter"></div>
            </div>
            <p>ЭТО ТВОЕ ПРИЛОЖЕНИЕ</p>
            <div className="main-page__page1__container-anime"><Slide2 /></div>
            <div className="main-page__page1__container-anime"><Slide5 /></div>
            <div className="main-page__page1__container-anime"><Slide6 /></div>


            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header"><Slide4 /></h1>
            </div>
          </div>

          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage2})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">НА ВИДУ- приложение можно увидеть на экране телефона в любое время!</h1>
              <p>Ссылку на таплинки можно найти только в соцсетях!! <br />Но как вспомниить аккаунт?</p>
            </div>
          </div>

          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage3})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">ДЛЯ "БЛОНДИНОК"- создавай приложение без дизайнеров и программистов!</h1>
              <p>В таплинках конструирование тоже очень простое!</p>
            </div>
          </div>

          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage4})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">АВТОМАТИЗАЦИЯ- Sweety сам подкачивает обновления из YouTube и Instagram</h1>
              <p>В таплинках есть админка. Но где найти ссылку и логин, который всегда теряется?</p>
              <div className="main-page__page1__container2">
              </div>
            </div>
          </div>

          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage5})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">ПРОЗРАЧНО- Sweety можно купить и получить на флешке*. После установки работает
              без интернета!</h1>
              <p>За таплинки нужно платить постоянно! И сколько будет в итоге оплачено за "чужую" ссылочку?</p>
              <div className="main-page__page1__container2">
              </div>
            </div>
          </div>

          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage6})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">СЕРЬЕЗНЫЙ БИЗНЕС ИМЕЕТ СВОЕ ПРИЛОЖЕНИЕ!!!</h1>
              <p>Таплинки-  это полу сайт и только!</p>
              <div className="main-page__page1__container2">
              </div>
            </div>
          </div>

          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage7})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">БЕСПЛАТНАЯ РЕКЛАМА- В приложениях можно отправлять PUSH уведомления прямо в телефон!</h1>
              <p>Реклама с посадкой на таплинки может быть только платной!</p>
              <br />
              <p>*Таплинки: под таплинками понимается любой сервис быстрых ссылок для социальных сетей</p>
              <p>*Получить на флэшке:  В любое время после окончания настроек приложения вы можете, заказать исходный код вашего приложения. </p>
              <p>*Работает без интернета: Если пользователь открывал ваше приложение хотя бы один раз, оно сохраняется в кэше телефона.</p>
              <div className="main-page__page1__container2">
              </div>
            </div>
          </div>

          <div className="main-page__page">
            <Loading />
          </div>
        </Swiper>

        <div className="main-page__footer">
          <div className="main-page__pages">
            <div className={classnames({ 'main-page__pages__selected': currentPage === 0 })} />
            <div className={classnames({ 'main-page__pages__selected': currentPage === 1 })} />
            <div className={classnames({ 'main-page__pages__selected': currentPage === 2 })} />
            <div className={classnames({ 'main-page__pages__selected': currentPage === 3 })} />
            <div className={classnames({ 'main-page__pages__selected': currentPage === 4 })} />
            <div className={classnames({ 'main-page__pages__selected': currentPage === 5 })} />
            <div className={classnames({ 'main-page__pages__selected': currentPage === 6 })} />

          </div>
          <div className="cookie-box" >
            <CookieBanner styles={styles}
              message='Мы используем Cookies для Goole analitics. Мы не собираем персональные данные'
              buttonMessage='Закрыть'
              link={<a href='https://ru.wikipedia.org/wiki/Cookie' target="_blank">Что это: COOKIES</a>}
            />
          </div>
          {!startOpened && currentPage > 0 && (
            <Start />
          )}
          {/* {!startOpened && currentPage < 6 && (
            <Button name="start" className="story-settings__preview__button" onClick={startClick} >Попробовать бесплатно</Button>
          )} */}

          <div className="textlogolanding">&reg;IMEC&nbsp;2015-2020</div>
        </div>

      </div>

    </React.Fragment>
  );
};

export default Landing;
