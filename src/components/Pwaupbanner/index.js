import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import classnames from 'classnames';
import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import {__} from 'utils/translation';

import './index.scss';

const Pwaupbanner = () => {
    const { url } = useSelector((state) => state.config.config.whiteLabel);
    const { active } = useSelector((state) => state.config.account);
    const [opened, setOpened] = useState(false);
    const [urlCopied, setUrlCopied] = useState(false);

    const [showPwaupbanner, setShowPwaupbanner] = useState(true);

    const onCopy = () => {
        copy(url);
        setUrlCopied(true);
        setTimeout(() => setUrlCopied(false), 2000);
      }
    

    return (
        <div className={classnames(['pwaupbanner', { hidden: !showPwaupbanner }])}>
        <Button
         noStyled
         isInline
         className="pwaupbanner__close"
         onClick={() => setShowPwaupbanner(false)}
       >
         <Icon type="timesCircle" />
       </Button>
       <Button
         noStyled
         isInline
         className="pwaupbanner__install"
         onClick={() => {} }
       >
         <Icon type="timesCircle" />
       </Button>
          
          <Slider
            opened={opened}
            onClose={() => setOpened(false)}
            title={__("Установка приложения")}
            subtitle=
            {<p>{__("Вставьте в браузер ссылку и установите это приложения за 1 минуту")}</p>}
          >
            {!urlCopied && <a onClick={onCopy} className="linkpwaupbanner">{url}</a>}
            {urlCopied && <div>{__("Ссылка скопирована")}</div>}
    
            <div className="pwaupbannercall">{__("Нажмите, чтобы скопировать")}</div>
            <div className="pwaupbannerwhytitle">{__("КАК ЭТО РАБОТАЕТ?")}</div>
            <div className="pwaupbannerwhybody">{__("Приложение будет мгновенно установлено на экран телефона, при помощи вашего браузера. Скопируйте ссылку, вставьте в ваш браузер, следуйте простой инструкции")}</div>
            
            <div className="pwaupbannerempty"></div>
          </Slider>
        </div>
      );
    };
    
    export default Pwaupbanner;  