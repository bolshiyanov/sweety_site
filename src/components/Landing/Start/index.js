import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import classnames from 'classnames';

import API, { getAdminSite, getRef, getInstagram, getCookieDomain } from 'utils/api';
import { event } from 'utils/googleAnalytics';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import {__} from 'utils/translation';

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
      setInstagramInvalid(__("Укажите ваш Instagram"));
      return;
    }

    setStarting(true);
    setCounter(30);
    API.getInstagramFeed(instagram).then((instaProfile) => {
      if (!instaProfile?.feed?.title) {
        setInstagramInvalid(__("Instagram не найден"));

        setCounter(null);
        setStarting(false);
    }
      else {
        API.register({ 
          instagram, 
          youtube, 
          whatsapp, 
          referer: getRef(),
          instagramProfile: {
            username: instaProfile?.feed?.title,
            biography: instaProfile?.feed?.biography,
            fullName: instaProfile?.feed?.fullName,
            profileImageUrl: instaProfile?.feed?.image,
            postCount: instaProfile?.feed?.postCount,
            url: instaProfile?.feed?.link,
            linkUrl: instaProfile?.feed?.externalUrl,
            posts: instaProfile?.items
          } 
        }).then((response) => {
          if (response?.errors) {
            if (response.errors.Instagram) {
              setInstagramInvalid(__("Instagram не найден"));
            }
            if (response.errors.Youtube) {
              setYoutubeInvalid(__("Канал или видео не найдены"));
            }
            if (response.errors.WhatsApp) {
              setWhatsappInvalid(__("Некорректный номер телефона"));
            }
          }
          else if (response?.invitationId) {
            event("signup", "instagram", getRef());
            setCookie(response.siteUrl.substring(response.siteUrl.indexOf('/') + 1), 
              response.invitationId, { path: '/' });
            setCookie('lastId', response.invitationId, { path: '/', domain: getCookieDomain() });
            window.location.href = getAdminSite(response.invitationId);
          }
          else if (response?.siteUrl) {
            window.location.href = response.siteUrl;
          }
          setCounter(null);
          setStarting(false);
        });
      }
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

    window.location.href = getAdminSite(lastId);
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
      {/* <Input
        className="start__field"
        value={instagram}
        onChange={handleChangeInstagram}
        placeholder="Instagram* (не обязательно)"
        required
      />
      {instagramInvalid && <label htmlFor="" className="start__error">{instagramInvalid}</label>}
      <Button
        className={classnames(["start__button", { start__button__starting: starting }])}
        onClick={handleStart}
        noStyled
      >
        {!starting ? 'ВЗЯТЬ ИМЯ ИЗ INSTAGRAM' : 'Собираем проект...'} {counter}
      </Button> */}
      {lastId && <div className="start__text">
        <a onClick={handleContinue}>{__("Продолжить последнее")}</a>
      </div>}
    </div>
  );
};

export default Start;