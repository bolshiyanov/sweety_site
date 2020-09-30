import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import copy from 'clipboard-copy';
import { ACCOUNT_STATUS_DEMO } from 'constants/accountStatuses';
import history from 'utils/history';
import StartPwaInstallIos from 'components/StartPwaInstallIos';
import { useReactPWAInstall } from 'components/PwaInstall/component';
import {__} from 'utils/translation';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import { SAVE_DATA } from 'constants/actions';

import './index.scss';

const Publish = () => {
  const [urlCopied, setUrlCopied] = useState(false);
  const [ saveSite, setSaveSite] = useState(false);
  const { updated, data, account } = useSelector((state) => state.config);
  const { url } = useSelector((state) => state.config.data);
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  
  useEffect(() => {
    if (!updated) {
      setSaveSite(false); 
    }
  }, [updated]);

  const dispatch = useDispatch(); 
  const saveData = () => {
    setSaveSite(true);
    dispatch({ type: SAVE_DATA, data });
    if ((!account.email || !account.active) && account.status !== ACCOUNT_STATUS_DEMO)
      history.push('/payment');
  };

  const onCopy = () => {
    copy(data.url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const isInstagramOpen = data.openingUrl && data.openingUrl.indexOf("instagram.com") > -1;

  const handleOpen = () => {
    const link = data.openingUrl ?? data.url;
    if (isInstagramOpen) {
      window.location.href = link;
    } else {
      window.open(link, "_blank");
    }
  };

  return (
     <div className="publish">
       {updated || saveSite 
         ? (
           <Button  
             onClick={saveData}
             className={classnames(['publish__button', 
             { publish__button__copy__already: saveSite }])}
             noStyled
           >
             {saveSite ? __("Публикуется обновление") : __("Сохрани изменения")}
           </Button> 
         )
         : (
           <React.Fragment>
             <Button
               className={classnames(['publish__button', 'publish__button__copy', 
               { publish__button__copy__already: urlCopied }])}
               noStyled
               onClick={onCopy}
             >
               
               {urlCopied ? __("Ссылка скопирована") : 
               <input className='linkrenderer' value={url} readOnly={true} />}
               
             </Button>
             <Button
               onClick={handleOpen}
               className={classnames(['publish__button', 'publish__button__goto'])}
               noStyled
             >
               <Icon type={isInstagramOpen ? "instagram" : "arrowCircleRight"} />
             </Button>
           </React.Fragment>
         )}
     
     {!updated && <div className="publish-notification"><b>{__("СКОПИРУЙ ЭТУ ССЫЛКУ И УСТАНОВИ В СВОИ СОЦСЕТИ")}</b></div>}
     </div>
  );
};

export default Publish;
