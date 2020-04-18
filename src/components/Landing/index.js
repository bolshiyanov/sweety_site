import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swiper from 'react-id-swiper';
import classnames from 'classnames';

import Button from 'components/common/Button';
import Slider from 'components/common/Slider';
import Loading from 'components/common/Loading';

import Header from 'components/Header';
import Start from 'components/Start';

import { HIDE_LANDING } from 'constants/actions';

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setCurrentPage(swiper.realIndex);
      });
      swiper.on('touchEnd', () => {
        setTimeout(() => {
          if (swiper.isEnd) {
            swiper.slideTo(0, 500);
          }
        }, 1000);
      });
    }
  }, [swiper]);

  const handleClick = useCallback(() => {
    if (swiper) {
      swiper.slideNext(500, () => {
        if (swiper.isEnd) {
          swiper.slideTo(0, 500);
        }
      });
    }
  }, [swiper]);

  return (
    <React.Fragment>
      <div className="main-page">
        <Header className="main-page__header" avatar={referrer.avatar} name={referrer.title} noConfig />
        <Swiper getSwiper={setSwiper}>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage1})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Оформи красиво свой онлайн бизнес</h1>
              <h2 className="main-page__page1__subtitle">Легко, просто и быстро создай свое модное приложение без дизайнеров и вэб мастеров. 
              Получай больше обращений и продаж через  свои соцсети. id_PdoOvGBv</h2>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage2})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Для блондинок,<br /> но не только...</h1>
              <h2 className="main-page__page1__subtitle">Мы создали очень простой интерфейс, который позволяет создавать свое 
              сайт и приложение за 5 минут.</h2>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage3})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Добавляй свои контакты</h1>
              <h2 className="main-page__page1__subtitle">Instagram позволяет разместить только одну ссылку. Добавляйте все мессенджеры,
              e-mail и телефон для связи в один клик.</h2>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage4})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Создавай креативы</h1>
              <h2 className="main-page__page1__subtitle">Переключайся между готовыми темами и добавляй ссылки на лучший контент.
              Используйте автоматизированный импорт из Youtube и Instagram.</h2>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage5})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Повышай охваты</h1>
              <h2 className="main-page__page1__subtitle">Размещай ссылки на эту страницу в постах и описании профиля. На тарифе "Blogger"
              получай трафик из поиска Google.</h2>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage6})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Оставайся на связи</h1>
              <h2 className="main-page__page1__subtitle">Друзья cмогут в один клик сохранить твое приложение на своем
              телефоне, а потом поделиться им. Разве это не круто, оставаться на экране телефона у своих друзей и заказчиков?</h2>
            </div>
          </div>
          <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${backgroundImage7})` }}>
            <div className="main-page__page1__container1">
              <h1 className="main-page__page1__header">Что такое Sweety?</h1>
              <h2 className="main-page__page1__subtitle">Sweety - это очень простой конструктор микро-целевых страниц для ваших соцсетей, чтобы 
              вы получали больше обращений через ваши мессенджеры. Используйте БЕЗ РЕГИСТРАЦИИ, бесплатно, навсегда.</h2>
               <div className="main-page__page1__container2">
                <div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/xxxxxxx" frameborder="0" rel="0" 
                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
               </div>
            </div>
          </div>
          
          <div className="main-page__page">
            <Loading />
          </div>
        </Swiper>
        {!startOpened && currentPage < 7 && (
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
            <Button
              noStyled
              onClick={openStart}
            >
              Упрощенная настройка
            </Button>

          </div>
        )}
      </div>
      <Slider
        opened={startOpened}
        onClose={closeStart}
        title="Введите данные"
      >
        <Start />
      </Slider>
    </React.Fragment>
  );
};

export default Landing;
