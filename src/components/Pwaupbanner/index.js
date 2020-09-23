import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import classnames from 'classnames';
import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { useReactPWAInstall } from 'components/PwaInstall/component.js';
import PwaInstall from "components/PwaInstall";
import {isIDevice} from 'utils/browser';
import {__} from 'utils/translation';

import './index.scss';

const Pwaupbanner = ({
  profile
}) => {
  const { url } = useSelector((state) => state.config.config.whiteLabel);
  const [opened, setOpened] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const { supported, isInstalled } = useReactPWAInstall();

  const [showPwaupbanner, setShowPwaupbanner] = useState(!isInstalled());
  const needBrowser = !supported();

  const onCopy = () => {
    copy(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  }

  const handleClose = (e) => {
    setShowPwaupbanner(false);
    e.stopPropagation();
  } 

  const handleInstall = () => {
    if (!needBrowser) {
      return;
    }
    setOpened(true);
  }

  const toBrowser = isIDevice() ? "Safari" : "Chrome";

  return (
    <div className={classnames(['pwaupbanner', { hidden: !showPwaupbanner }])}>
      <div onClick={handleInstall}>
        {needBrowser && __("Установка приложения")}
        {!needBrowser && <PwaInstall profile={profile} />}
      </div>
      <Button
        noStyled
        isInline
        className="pwaupbanner__close"
        onClick={handleClose}
      >
        <Icon type="timesCircle" />
      </Button>
        
      <Slider
        opened={opened}
        onClose={() => setOpened(false)}
        title={__("Установка приложения")}
        subtitle=
        {<p>{__("Вставьте в браузер [browser] ссылку и установите это приложения за 1 минуту").replace("[browser]", toBrowser)}</p>}
      >
        {!urlCopied && <a onClick={onCopy} className="linkpwaupbanner">{url}</a>}
        {urlCopied && <div>{__("Ссылка скопирована")}</div>}

        <div className="pwaupbannercall">{__("Нажмите, чтобы скопировать")}</div>
        <div className="pwaupbannerwhytitle">{__("КАК ЭТО РАБОТАЕТ?")}</div>
        <div className="pwaupbannerwhybody">{__("Приложение будет мгновенно установлено на экран телефона, при помощи вашего браузера. Скопируйте ссылку, вставьте в ваш браузер [browser], следуйте простой инструкции")
          .replace("[browser]", toBrowser)}</div>
        
        <div className="pwaupbannerempty"></div>
      </Slider>
    </div>);
};
    
export default Pwaupbanner;  