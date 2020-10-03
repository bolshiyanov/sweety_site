import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import classnames from 'classnames';
import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { useReactPWAInstall } from 'components/PwaInstall/component.js';
import PwaInstall from "components/PwaInstall";
import logo512 from 'images/referrer_avatar.jpg';
import raiting from 'images/raiting.png';
import { IonIcon } from '@ionic/react';
import { shareOutline, star, starHalf } from 'ionicons/icons';
import { isIDevice, isIOsSafari, isNativePwa } from 'utils/browser';
import AvatarBase from 'components/common/AvatarBase';
import { __ } from 'utils/translation';
import { getSearchString } from 'utils/url';

import './index.scss';

const Pwaupbanner = ({
  profile
}) => {
  const { title, description, name, avatar, avatarPreview, url } = useSelector((state) => state.config.data);
  const [opened, setOpened] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const { supported, isInstalled } = useReactPWAInstall();

  const isDemo = getSearchString(window.location.search, 'demo') === "preview";
  const needBanner = (isIDevice() && (isDemo || !isInstalled())) || 
    (!isIDevice() && isNativePwa() && !isInstalled()) ||
    (!isIDevice() && !isNativePwa());
  const [showPwaupbanner, setShowPwaupbanner] = useState(needBanner);
  const needBrowser = (isIDevice() && (!supported() || !isIOsSafari())) ||
    (!isIDevice() && !supported());

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
    <div>
      <div className={classnames(['pwaupbanner', { hidden: !showPwaupbanner }])}>
        <div className="box-left">
          <Button
            noStyled
            isInline
            className="box-left__close"
            onClick={handleClose}
          >
            <Icon type="timesCircle" />
          </Button>
        </div>
        <div className="pwaupbanner-heder-avatar-box" >
          <AvatarBase avatar={avatar} avatarPreview={avatarPreview} avatarDefault={logo512} wrapperImageClass="pwaupbanner-heder-avatar" />
        </div>
        <div className="titleBox">
          <div className="firstBox">{title}</div>
          <div className="secondBox">{description}</div>
          <div className="thirdBox" style={{ backgroundImage: `URL(${raiting})` }} />
          <div className="fourthBox">{__("без регистрации, бесплатно, мгновенно")}</div>
        </div>
        <div className="box-right">
          <div className="install" onClick={handleInstall}>
            {needBrowser && __("Установить")}
            {!needBrowser && <PwaInstall profile={profile} />}
          </div>
        </div>
      </div>



      <Slider
        opened={opened}
        onClose={() => setOpened(false)}
        title={__("Для установки этого приложения:")}
        subtitle=
        {<p>{__("Вставьте в браузер [browser] ссылку и установите это приложения за 1 минуту").replace("[browser]", toBrowser)}</p>}
      >
        {!urlCopied && <div className="linkpwaupbanner"><a onClick={onCopy} >{url}</a></div>}
        {urlCopied && <div className="pwaupbannercopied">{__("Ссылка скопирована")}</div>}

        <div className="pwaupbannercall">{__("Нажмите, чтобы скопировать")}</div>
        <div className="pwaupbannerwhytitle">{__("КАК ЭТО РАБОТАЕТ?")}</div>
        <div className="pwaupbannerwhybody">{__("Приложение будет мгновенно установлено на экран телефона, при помощи вашего браузера  [browser]. Скопируйте ссылку, вставьте в браузер, следуйте простой инструкции")
          .replace("[browser]", toBrowser)}</div>

        <div className="pwaupbannerempty"></div>
      </Slider>
    </div>);
};

export default Pwaupbanner;  