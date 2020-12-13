import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import { isIDevice } from 'utils/browser';
import { useReactPWAInstall } from 'components/PwaInstall/component.js';
import Slider from 'components/common/Slider';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';
import {__} from 'utils/translation';

import './index.scss';

const Footer = () => {
  const startUrl = 'https://dash.sweety.link'
  return (
    <footer>
      <div className="footer-brends-box-items">
          <div className="brends-items"><IonIcon className="footer-brends-box-items-icon-icon" icon={logoPwa} /></div>
          <div className="brends-items"><IonIcon size="small" icon={logoApple} /></div>
          <div className="brends-items"><IonIcon size="small" icon={logoAndroid} /></div>
          <div className="brends-items"><IonIcon size="amall" icon={logoWindows} /></div>
        </div>
       <a href={startUrl} className="textlogofooter" target="_blank" rel="noopener noreferrer" >&reg;SWEETY.LINK&nbsp;2015-2020</a> <br/><br/>
        
        
    </footer>
  );
};

export default Footer;  
