import React from 'react';
import { useReactPWAInstall } from "./component";
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';
import './index.scss';

const PwaInstall = ({ profile }) => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  
  
  const detectMobile = () => {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i,
      /BlackBerry/i, /Windows Phone/i]; return toMatch.some((toMatchItem) => { return navigator.userAgent.match(toMatchItem); });
  }

  const handleClick = () => {
    pwaInstall({
      title:  detectMobile() ? "Приложение с моей аватаркой появится на экране твоего телефона сразу после установки" :
      "Приложение с моей аватаркой ты сможешь найти на вкладке ПУСК > ПРИЛОЖЕНИЯ > НОВОЕ, сразу после установки"  ,
      logo: `https://sweety.link/content/img/${profile}/logo192.png`,
      features: (
        <div className="MuiTypography-root MuiTypography-body2"><p>Теперь вы получите наши лучшие предложения
        </p></div>
      ),
      description: "Установка будет произвдена через ваш БРАУЗЕР. Кредитная карта не понадобится, регистрация не нужна, рассылки технически не возможны",
    });
  };
  return (
    <React.Fragment>
        <div className="publish-pwainstall">
          <Button className="publish-pwainstall__button" type="Pwa_Install"
            onClick={handleClick}>
            Установить
          </Button>
        </div>

    </React.Fragment>
  );
};


export default PwaInstall; 

