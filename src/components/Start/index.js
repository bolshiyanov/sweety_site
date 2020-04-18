import React, { useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';

import API, { getAdminSiteByInvitation } from 'utils/api';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import './index.scss';

const Start = () => {
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [_, setCookie] = useCookies();

  const handleChangeInstagram = useCallback((value) => {
    setInstagram(value);
  }, [setInstagram]);

  const handleChangeYoutube = useCallback((value) => {
    setYoutube(value);
  }, [setYoutube]);

  const handleChangeWhatsapp = useCallback((value) => {
    setWhatsapp(value);
  }, [setWhatsapp]);

  const handleStart = () => {
    API.register({ instagram, youtube, whatsapp }).then((response) => {
      setCookie(response.siteUrl.substring(response.siteUrl.indexOf('/') + 1), response.invitationId, { path: '/' });
      window.location.href = getAdminSiteByInvitation(response.invitationId);
    });
  };

  return (
    <div className="start">
      <Input
        className="start__field"
        value={instagram}
        onChange={handleChangeInstagram}
        placeholder="Ваш Instagram*"
      />
      <Input
        className="start__field"
        value={youtube}
        onChange={handleChangeYoutube}
        placeholder="Ваш YouTube"
      />
      <Input
        className="start__field"
        value={whatsapp}
        onChange={handleChangeWhatsapp}
        placeholder="Ваш WhatsApp"
        
      />
      <Button
        className="start__button"
        onClick={handleStart}
        noStyled
      >
        НАЧАТЬ
      </Button>
      <div className="start__text">
        * Обязательное поле. Нажмите на эту&nbsp;
        <a href="#">ссылку</a>
        &nbsp;чтобы пропустить упрощенную настройку. YouTube и WhatsApp не обязательные поля. Если же вы установите ссылки, то последние посты Instagram и 
        видео из YouTube будут обновляться автоматически. РЕКОМЕНДУЕТСЯ!
      </div>
    </div>
  );
};

export default Start;
