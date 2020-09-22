import React from 'react';
import { useReactPWAInstall } from "./component";
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';
import './index.scss';
import {__} from 'utils/translation';
import { isWebView, isMobile } from 'utils/browser';

const PwaInstall = ({ profile }) => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: isMobile() || isWebView() ? __("Приложение с моей аватаркой появится на экране твоего телефона сразу после установки") :
      __("Приложение с моей аватаркой ты сможешь найти на вкладке ПУСК > ПРИЛОЖЕНИЯ > НОВОЕ, сразу после установки")  ,
      logo: `https://sweety.link/content/img/${profile}/logo192.png`,
      features: (
        <div className="MuiTypography-root MuiTypography-body2"><p>{__("Теперь вы получите наши лучшие предложения")}
        </p></div>
      ),
      description: __("Установка будет произвдена через ваш БРАУЗЕР. Кредитная карта не понадобится, регистрация не нужна, рассылки технически не возможны"),
      descriptionTitle: __("Описание:")
    });
  };
  return (
    <React.Fragment>
        <div className="publish-pwainstall">
          <Button className="publish-pwainstall__button" type="Pwa_Install"
            onClick={handleClick}>
            {__("Установить")}
          </Button>
        </div>

    </React.Fragment>
  );
};


export default PwaInstall; 

