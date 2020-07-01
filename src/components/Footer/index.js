import React from 'react';
import { useSelector } from 'react-redux';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';

import './index.scss';

const Footer = () => {
  const startUrl = 'https://sweety.link'
  const { url, name } = useSelector((state) => state.config.config.whiteLabel);
  const { active } = useSelector((state) => state.config.account);
  const { currentTheme } = useSelector((state) => state.config);
  const fontStyles = currentTheme.getFontColorStyles();
  return (
    <footer>
      {active ? <br /> : <a href={url} className="textfooter">Создай приложение как у меня</a>}
      <br/>     
      <div className="footer-brends-box-items">
      <div className="brends-items"><IonIcon className="footer-brends-box-items-icon-icon" icon={logoPwa} /></div>
      <div className="brends-items"><IonIcon size="small" icon={logoApple} /></div>
      <div className="brends-items"><IonIcon size="small" icon={logoAndroid} /></div>
      <div className="brends-items"><IonIcon size="amall" icon={logoWindows} /></div>
    </div>
    <div className="textlogofooter">&reg;IMEC&nbsp;2015-2020</div>
    </footer>
  );
};

export default Footer; 
