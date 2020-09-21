import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copy from 'clipboard-copy';

import { useReactPWAInstall } from 'components/PwaInstall/component.js';
import Slider from 'components/common/Slider';

import {__} from 'utils/translation';

import './index.scss';

const Footer = () => {
  const { url } = useSelector((state) => state.config.config.whiteLabel);
  const { active } = useSelector((state) => state.config.account);
  const [opened, setOpened] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const { supported, isInstalled } = useReactPWAInstall();

  const onCopy = () => {
    copy(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
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
        title={__("Инструкция как создать приложение")}
        subtitle=
        {<p>{__("Откройте ссылку на ваше приложение в браузере")}</p>}
      >
        {!urlCopied && <a onClick={onCopy} className="textfooter">{url}</a>}
        {urlCopied && <div>{__("Ссылка скопирована")}</div>}
      </Slider>
    </footer>
  );
};

export default Footer;  
