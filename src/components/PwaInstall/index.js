import React from 'react';
import { useReactPWAInstall } from "react-pwa-install";

const PwaInstall = ({ profile }) => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

    const handleClick = () => {
      pwaInstall({
        title: "Сохраните на главный экран",
        logo: `/${profile}/logo192.png`,
        features: (
          <ul>
            <li>Последние новости</li>
            <li>Лучшие актуальные предложения</li>
          </ul>
        ),
        description: "Будем всегда на связи.",
      });
    };
  
    return (
      <div>
        {supported() && !isInstalled() && (
          <button type="button" onClick={handleClick}>
            Сохранить на главный экран
          </button>
        )}
      </div>
    );
};

export default PwaInstall;
