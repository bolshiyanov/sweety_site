import React from 'react';
import { useReactPWAInstall } from "react-pwa-install";

const PwaInstall = () => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

    const handleClick = () => {
      pwaInstall({
        title: "Сохраните на главный экран",
        logo: "./logo512.png",
        features: (
          <ul>
            <li>Последние новости</li>
            <li>Лучшие актуальные предложения</li>
            <li>Работает и offline!</li>
          </ul>
        ),
        description: "Сохраните приложение в один клик! Будем всегда на связи.",
      })
        .then(() => alert("Приложение было установлено успешно"))
        .catch(() => alert("Не удалось установить приложение"));
    };
  
    return (
      <div>
        {supported() && !isInstalled() && (
          <button type="button" onClick={handleClick}>
            Сохранить на главный экран
          </button>
        )}
        {!supported() && <div>Not supported</div>}
        {isInstalled() && <div>Already Installed</div>}
      </div>
    );
};

export default PwaInstall;
