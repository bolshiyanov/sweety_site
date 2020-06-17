import React from 'react';
import { useSelector } from 'react-redux';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';

import './index.scss';

const Footer = () => {
  const { url, name } = useSelector((state) => state.config.config.whiteLabel);
  const { active } = useSelector((state) => state.config.account);
  const { currentTheme } = useSelector((state) => state.config);
  const fontStyles = currentTheme.getFontColorStyles();
  return (
    <footer>
      {active ? <br /> : <a href={url} className="textfooter">Создай приложение как у меня бесплатно</a>}
      <br/><br/>
      {active ? <br /> : <a href={url} className="textlogofooter">SWEETY_2020</a>}
      { active &&(  
      <div className="footer-brends-box-active">
        <div className="brends-items"><IonIcon className="footer-brends-box-items-icon-icon" icon={logoPwa} /></div>
        <div className="brends-items"><IonIcon size="large" icon={logoApple} /></div>
        <div className="brends-items"><IonIcon size="large" icon={logoAndroid} /></div>
        <div className="brends-items"><IonIcon size="large" icon={logoWindows} /></div>
      </div>
      )}
      { ! active &&(  
      <div className="footer-brends-box-no-active">
        <div className="brends-items"><IonIcon className="footer-brends-box-items-icon-icon" icon={logoPwa} /></div>
        <div className="brends-items"><IonIcon size="large" icon={logoApple} /></div>
        <div className="brends-items"><IonIcon size="large" icon={logoAndroid} /></div>
        <div className="brends-items"><IonIcon size="large" icon={logoWindows} /></div>
      </div>
      )}
    </footer>
  );
};

export default Footer; 
