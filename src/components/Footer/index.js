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
      {active ? <br /> : <a href={url} target="_blank" className="textfooter">Создай приложение как у меня</a>}
      <div className="textlogofooter"></div>
    </footer>
  );
};

export default Footer;  
