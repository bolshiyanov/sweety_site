import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import classnames from 'classnames';

import API, { getAdminSiteByInvitation, getRef, getInstagram } from 'utils/api';
import { event } from 'utils/googleAnalytics';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import './index.scss';

const Start = () => {
  const [starting, setStarting] = useState(false);
  const [instagram, setInstagram] = useState(getInstagram());
  const [instagramInvalid, setInstagramInvalid] = useState('');
  const [youtube, setYoutube] = useState('');
  const [youtubeInvalid, setYoutubeInvalid] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappInvalid, setWhatsappInvalid] = useState('');
  const [cookies, setCookie] = useCookies();
  const [counter, setCounter] = useState(null);

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
    setCounter(30);
    API.register({ instagram, youtube, whatsapp, referer: getRef() }).then((response) => {
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
      else if (response?.siteUrl) {
        window.location.href = response.siteUrl;
      }
      setCounter(null);
      setStarting(false);
    });
  };

  /*const handleQuickStart = e => {
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
  };*/

  const handleContinue = e => {
    e.preventDefault();

    window.location.href = getAdminSiteByInvitation(lastId);
  };

  useEffect(() => {
    counter && counter > 0 && setTimeout(() => {
      if (!starting) {
        setCounter(null);
        return;
      }
      setCounter(counter - 1);
      if (counter <= 1) {
        setCounter(null);
      }
    }, 1000);
  }, [counter]);

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
      <Button
        className={classnames(["start__button", { start__button__starting: starting }])}
        onClick={handleStart}
        noStyled
      >
        {!starting ? 'НАЧАТЬ' : 'Собираем проект...'} {counter}
      </Button>
      {lastId && <div className="start__text">
        <a href="#" onClick={handleContinue}>Продолжить последнее</a>
      </div>}
    </div>
  );
};

export default Start;
