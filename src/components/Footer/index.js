import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import { isIDevice } from 'utils/browser';
import { useReactPWAInstall } from 'components/PwaInstall/component.js';
import Slider from 'components/common/Slider';

import {__} from 'utils/translation';

import './index.scss';

const Footer = () => {
  const { url } = useSelector((state) => state.config.config.whiteLabel);
  const { active } = useSelector((state) => state.config.account);
  const [opened, setOpened] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [urlCopied1, setUrlCopied1] = useState(false);
  const { supported, isInstalled } = useReactPWAInstall();
  const toBrowser = isIDevice() ? "Safari" : "Chrome";
  const onCopy = () => {
    copy(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  }

  const onCopy1 = () => {
    copy("https://sweety.link");
    setUrlCopied1(true);
    setTimeout(() => setUrlCopied1(false), 2000);
  }

  return (
    <footer>
      {active ? <br /> : 
      (supported() && !isInstalled()) ? <a href={url} target="_blank" className="textfooter">{__("Создай приложение как у меня")}</a> :
      <a onClick={() => setOpened(true)} className="textfooter">{__("Создай приложение как у меня")}</a>}
      <div className="textlogofooter"></div>
      
      <Slider
        opened={opened}
        onClose={() => setOpened(false)}
        title={__("Получите копию этого приложения")}
        subtitle=
        {<p>{__("Вставьте в браузер [browser] эту ссылку, установите Sweety App Creator , отредактируйте контент, ваше приложение готово за 1 минуту").replace("[browser]", toBrowser)}</p>}
      >
        {!urlCopied && <a onClick={onCopy} className="linkfooter">{url}</a>}
        {urlCopied && <div>{__("Ссылка скопирована")}</div>}

        <div className="footercall">{__("Нажмите, чтобы скопировать")}</div>
        <div className="footerwhytitle">{__("ПОЧЕМУ ЭТО ВОЗМОЖНО?")}</div>
        <div className="footerwhybody">{__("В соответствии с политикой использования разрешается копирование любых приложений, которые созданы в создателе SWEETY , если автор приложения использует тариф БЕСПЛАТНЫЙ. Чтобы защитить от копирования свое приложения, нужно перейти на тариф BUSINESS")}</div>
        
        <div className="footerwhytitle">{__("СЛИШКОМ СЛОЖНО?")}</div>
        <div className="footerwhybody">{__("Всего за 4000 рублей мы изучим ваш бизнес и создадим продающий дизайн для вашего бесплатного приложения. Переходите по ссылке https://sweety.link и оставляйте заявку")}</div>
        
        {!urlCopied1 && <a onClick={onCopy1} className="linkfooter">https://sweety.link</a>}
        {urlCopied1 && <div>{__("Ссылка скопирована")}</div>}

        <div className="footercall">{__("Нажмите, чтобы скопировать")}</div>
        <div className="footerempty"></div>
      </Slider>
    </footer>
  );
};

export default Footer;  
