import React from 'react';
import { useReactPWAInstall } from "react-pwa-install";
import Button from 'components/common/Button';
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
        <div className="pwainstall-chaild">
        {supported() && !isInstalled() && (
          <Button className="button pulse" type="Pwa_Install" onClick={handleClick}>
            Установи мое приложение на свой телефон. Жми смелей!
          </Button>
        )}
        </div>
      </div>
    );
};
 
export default PwaInstall;
