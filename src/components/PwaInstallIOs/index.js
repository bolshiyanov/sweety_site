import React from 'react';
import { useSelector } from 'react-redux';
import PwaInstallPopupIOS from 'react-pwa-install-ios';

import './index.scss';

const PwaInstallIOs = ({profile}) => {
  return (
    <PwaInstallPopupIOS delay={10}>
      <div className="pwa-install-popup-ios-content">
        <div className="pwa-install-popup-ios-content__left">
            <img class="appIcon" src={`https://sweety.link/content/img/${profile}/logo152.png`}/>
        </div>
  <div className="pwa-install-popup-ios-content__right">Установите себе мое приложение: 
  Открой эту страницув браузере SAFARI !!!,затем нажми на нижнее меню по кнопке
            <span><img className="small" src="./ic_iphone_share.png"/></span>
            <br/>
            , а затем жми [+] - 'На экран "Домой"'
        </div>
      </div>
    </PwaInstallPopupIOS>);
};

export default PwaInstallIOs;
