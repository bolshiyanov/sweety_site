import React, { useState, useCallback, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import classnames from 'classnames';


import { Helmet } from 'react-helmet';

import Button from 'components/common/Button';
import Slider from 'components/common/Slider';
import Loading from 'components/common/Loading';

import Headerlanding from 'components/Headerlanding';
import Start from 'components/Landing/Start';

import referrerAvatar from 'images/referrer_avatar.jpg';
import backgroundImage1 from 'images/main-background1.jpg';
import backgroundImage2 from 'images/main-background2.jpg';
import backgroundImage3 from 'images/main-background3.jpg';
import backgroundImage4 from 'images/main-background4.jpg';
import backgroundImage5 from 'images/main-background5.jpg';
import backgroundImage6 from 'images/main-background6_1.jpg';
import backgroundImage7 from 'images/main-background7_1.jpg';

import 'swiper/swiper.scss';

const Landing = () => {
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
    title: "Free links creator",
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
            swiper.slideTo(3);
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
        <meta property="og:title"  content="Активная ссылка Sweety link" />  
        <meta property="og:description" content="Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://sweety.link" />
        <meta name="twitter:title" content="Активная ссылка Sweety link" /> 
        <meta name="twitter:description" content="Активная ссылка оформи САМ красочную Sweety Link, чтобы зарабатывать в соцсетях больше, проще, быстрее" />
        <meta name="twitter:creator" content="Free Link Creator" />
        <meta name="twitter:image:src" content="https://sweety.link/logo512.png/logo512.png" />
        <meta name="twitter:domain" content="https://sweety.link/logo512.png" /> 
      </Helmet>
      <div className="main-page">
        <Headerlanding className="main-page__header" avatar={referrer.avatar} name={referrer.title} noConfig />
        <Swiper getSwiper={setSwiper}>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage1})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Активная ссылка<br />в профиле твоих<br />Соцсетей!</h1>
              <p>ТВОЕ PWA ПРИЛОЖЕНИЕ.....</p>
              
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage2})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Бесплатно,<br />без регистрации,<br />восхитительно!</h1>
              
              <p><a href="https://dash.sweety.link/"  target="_blank">БЫСТРЫЙ СТАРТ ЗДЕСЬ...</a></p>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage3})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Добавь мессенджеры,<br />соцсети, YouTube и...<br />все, что угодно!</h1>
              <p>ЗАРАБАТЫВАЙ ПРОЩЕ...</p>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage4})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Как микроблогеры использует Sweety</h1>
              <p><a href="https://dash.sweety.link/"  target="_blank">БЫСТРЫЙ СТАРТ ЗДЕСЬ</a></p>
              <div className="main-page__page1__container2">
                <div className="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/zsy0pbMBBRI?controls=0" 
                frameborder="0" rel="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
          
          <div className="main-page__page">
            <Loading /> 
          </div>
        </Swiper>
        {!startOpened && currentPage < 4 && (
          <div className="main-page__footer">
            <div className="main-page__pages">
              <div className={classnames({ 'main-page__pages__selected': currentPage === 0 })} />
              <div className={classnames({ 'main-page__pages__selected': currentPage === 1 })} />
              <div className={classnames({ 'main-page__pages__selected': currentPage === 2 })} />
              <div className={classnames({ 'main-page__pages__selected': currentPage === 3 })} />
            </div>
            <Start />
            </div>
        )}
      </div>
      
    </React.Fragment>
  );
};

export default Landing;
