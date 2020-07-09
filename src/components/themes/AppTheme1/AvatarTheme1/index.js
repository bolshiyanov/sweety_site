import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IonIcon } from '@ionic/react';
import { shareOutline } from 'ionicons/icons';
import addedAvatar from 'images/ImageTheme1.png';

import Button from 'components/common/Button';
import './index.scss';

const AvatarTheme1 = () => {
  const [data, setData] = useState({ name: '', avatar: ''});

  const {  name, avatar, url } = useSelector((state) => state.config.data);
  
  const onShare = () => {
    navigator.share({
        title: {name}, // Заголовок
        text: 'Установи мое приложение по этой ссылке', // Текст
        url: {url}, // ссылка
      });
    };
  
    return (
      <React.Fragment>
      <div className="user-name-theme1"  >{name || "Theme 1"}&nbsp;: Official App&nbsp;
      {navigator.share && 
            <Button onClick={onShare} isInline className="tooltip-theme1">
          <IonIcon slot="start" icon={shareOutline} /></Button>}

      
      </div>    
      <div className="avatar-theme1"
       style={{ backgroundImage: `URL(${data.avatar || addedAvatar})` }}  />
       </React.Fragment>
  );
};


export default AvatarTheme1;
