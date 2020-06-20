import React from 'react';
import { useSelector } from 'react-redux';
import PwaInstallPopupIOS from 'react-pwa-install-ios';
import Icon from 'components/common/Icon';
import { IonIcon } from '@ionic/react';
import { shareOutline } from 'ionicons/icons';


import './index.scss';

// const isSafari = () => (navigator.userAgent || navigator.vendor || navigator.opera).indexOf('safari/') > -2;

const PwaInstallIOs = ({ profile }) => {
  return (
    <PwaInstallPopupIOS delay={10}>
      <div className="pwa-install-popup-ios-content">
        <div className="pwa-install-popup-ios-content__left">
          <img class="appIcon" src={`https://sweety.link/content/img/${profile}/logo152.png`} />
        </div>
        
        <div className="pwa-install-popup-ios-content__right">Установите себе мое приложение:<br />
        1) Открой Safari <Icon className="icon-16" type="compass" />,<br />
        2) Затем жми <IonIcon slot="start" icon={shareOutline} />;<br />
        3) Затем жми <Icon className="icon-16" type="plusSquare" /> - На экран "Домой"
        </div>
      </div>
    </PwaInstallPopupIOS>);
};

export default PwaInstallIOs; 
