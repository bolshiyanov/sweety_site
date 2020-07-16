import React from 'react';
import { useReactPWAInstall } from "./component";
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';
import './index.scss';

const PwaInstall = ({ profile }) => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: "Установите себе мое приложение",
      logo: `https://sweety.link/content/img/${profile}/logo192.png`,
      features: (
        <ul>
          <li>Ты будешь в курсе моих событий</li>
          <li>Я не затеряюсь в ленте твоих соцсетей</li>
          <li>Ты получишь мои лучшие предложения</li>
        </ul>
      ),
      description: "ТЕПЕРЬ МЫ БУДЕМ НА СВЯЗИ ВСЕГДА!",
    });
  };

  return (
    <div className="pwainstall">
      {!supported() && !isInstalled() && (
        <div className="footer-brends-box-items">
          <div className="brends-items" onClick={handleClick}><IonIcon className="footer-brends-box-items-icon-icon" icon={logoPwa} /></div>
          <div className="brends-items" onClick={handleClick}><IonIcon size="small" icon={logoApple} /></div>
          <div className="brends-items" onClick={handleClick}><IonIcon size="small" icon={logoAndroid} /></div>
          <div className="brends-items" onClick={handleClick}><IonIcon size="amall" icon={logoWindows} /></div>
        </div>
      )}
    </div>

  );
};

export default PwaInstall;
