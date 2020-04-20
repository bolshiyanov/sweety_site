import React, { useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import classnames from 'classnames';

import API, { getAdminSiteByInvitation, getAdminSite, getRef } from 'utils/api';
import { event } from 'utils/googleAnalytics';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import './index.scss';

const Start = () => {
  const [ starting, setStarting] = useState(false);
  const [instagram, setInstagram] = useState('');
  const [instagramInvalid, setInstagramInvalid] = useState('');
  const [youtube, setYoutube] = useState('');
  const [youtubeInvalid, setYoutubeInvalid] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappInvalid, setWhatsappInvalid] = useState('');
  const [cookies, setCookie] = useCookies();

  const handleChangeInstagram = useCallback((value) => {
    setInstagram(value);
  }, [setInstagram]);

  const handleChangeYoutube = useCallback((value) => {
    setYoutube(value);
  }, [setYoutube]);

  const handleChangeWhatsapp = useCallback((value) => {
    setWhatsapp(value);
  }, [setWhatsapp]);

  const lastId = cookies["lastId"];

  const handleStart = e => {
    e.preventDefault();

    if (starting) {
      return;
    }
    if (!instagram) {
      setInstagramInvalid("Укажите ваш Instagram");
      return;
    }

    setStarting(true);
    API.register({ instagram, youtube, whatsapp, referer: getRef() }).then((response) => {
      console.log(response);
      if (response?.errors) {
        if (response.errors.Instagram) {
          setInstagramInvalid("Instagram не найден");
        }
        if (response.errors.Youtube) {
          setYoutubeInvalid("Канал или видео не найдены");
        }
        if (response.errors.WhatsApp) {
          setWhatsappInvalid("Некорректный номер телефона");
        }
      }
      else if (response?.invitationId) {
        event("signup", "instagram", getRef());
        setCookie(response.siteUrl.substring(response.siteUrl.indexOf('/') + 1), 
          response.invitationId, { path: '/' });
        window.location.href = getAdminSiteByInvitation(response.invitationId);
      }
      setStarting(false);
    });
  };

  const handleQuickStart = e => {
    e.preventDefault();

    if (starting) {
      return;
    }
    setStarting(true);
    API.register({ referer: getRef() }).then((response) => {
      event("signup", "anonymous", getRef());
      if (response?.invitationId) {
        setCookie(response.siteUrl.substring(response.siteUrl.indexOf('/') + 1),
          response.invitationId, { path: '/' });
        window.location.href = getAdminSiteByInvitation(response.invitationId);
      } else {
        window.location.href = getAdminSite();
      }
    });
  };

  const handleContinue = e => {
    e.preventDefault();

    window.location.href = getAdminSiteByInvitation(lastId);
  };

  return (
    <div className="start">
      <Input
        className="start__field"
        value={instagram}
        onChange={handleChangeInstagram}
        placeholder="Ваш Instagram*"
        required
      />
      {instagramInvalid && <label htmlFor="" className="start__error">{instagramInvalid}</label>}
      <Input
        className="start__field"
        value={youtube}
        onChange={handleChangeYoutube}
        placeholder="Ваш YouTube"
      />
      {youtubeInvalid && <label htmlFor="" className="start__error">{youtubeInvalid}</label>}
      <Input
        className="start__field"
        value={whatsapp}
        onChange={handleChangeWhatsapp}
        placeholder="Ваш WhatsApp"
      />
      {whatsappInvalid && <label htmlFor="" className="start__error">{whatsappInvalid}</label>}
      <Button
        className={classnames(["start__button", { start__button__starting: starting }])}
        onClick={handleStart}
        noStyled
      >
        {!starting ? 'НАЧАТЬ' : 'Собираем проект...'}
      </Button>
      <div className="start__text">
        <a href="#" onClick={handleQuickStart}>Войти без Instagram</a>
      </div>
      {lastId && <div className="start__text">
        или <a href="#" onClick={handleContinue}>продолжить последнее</a>
      </div>}
    </div>
  );
};

export default Start;
