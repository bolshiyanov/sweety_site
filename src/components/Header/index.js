import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Avatar from 'components/common/Avatar';
import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import API, { getAdminSite } from 'utils/api';
import classnames from 'classnames';

import './index.scss';

const Header = ({ avatar, name, className, profile }) => {
  const [cookies] = useCookies();
  const [editOpened, setEditOpened] = useState(false);
  const [recoverSent, setRecoverSent] = useState(false);
  const [recoverSending, setRecoverSending] = useState(false);
  const [lastDate, setLastDate] = useState(null);
  const [directUrl, setDirectUrl] = useState(null);

  var inviteId = cookies[profile];
  if (inviteId === "undefined") {
    inviteId = null;
  }

  const handleClick = () => {
    if (inviteId) {
      window.location.href = `${getAdminSite()}?invitationId=${inviteId}`;
    } else {
      openEdit();
    }
  }

  const openEdit = () => {
    setEditOpened(true);
    return false;
  };

  const closeEdit = () => {
    setEditOpened(false);
  };

  const recover = (e) => {
    e.preventDefault();
    
    setRecoverSending(true);
    API.recoverPassword(profile).then((response) => {
      if (response?.lastDate) {
        const date = response?.lastDate;
        setLastDate(`${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`);
        setDirectUrl(response.directUrl);
      }
      setRecoverSent(true);
      setRecoverSending(false);
    });
  };

  return (
    <React.Fragment>
      <header className={className}>
        <Avatar image={avatar} />
        <span className="user-name">{name}</span>
        <span className="flex-delimiter" />
        
        <Button onClick={handleClick} isInline className={classnames["pulse2", "tooltip"]}>
          <Icon type="edit" />
          {inviteId &&<span class="tooltip__text">Только вы можете редактировать эту страницу</span>}
        </Button>
      </header>
      <Slider
        opened={editOpened}
        onClose={closeEdit}
        onSubmit={() => setEditOpened(false)}
        title="О редактировании"> 
        <div className='footerbox'>
          {!recoverSent && <React.Fragment>
            <div className='footertext'>Для входа в режим редактирования страницы будет отправлена секретная ссылка в ваш Instagram Direct <b>@{name}</b> от пользователя <b>@free_link_creator</b>.</div>
            <div className='footertext'>Убедитесь, что вы подписаны на наш аккаунт <b><a href="https://instagram.com/free_link_creator" target="_blank">https://instagram.com/free_link_creator</a></b></div>
            <Button className="recovery__button" onClick={recover}>{!recoverSending ? "Отправить ссылку" : "Отправляем ссылку..."}</Button>
          </React.Fragment>}

          {lastDate && <React.Fragment>
            <div className='footertext'>Ранее {lastDate} в Instagram Direct вам была отправлена ссылка на ваш редактор сайта. Пожалуйста, проверьте Сообщения в Direct и вкладку Запросы от <b>@free_link_creator</b> на эту дату.</div>
            <div>Если вы не смогли найти ссылку, пожалуйста, отправьте сообщение в произвольной форме на <b><a href="https://instagram.com/free_link_creator" target="_blank">https://instagram.com/free_link_creator</a></b>: ссылка будет продублирована в течение 24 часов.</div>
          </React.Fragment>}

          {!lastDate && directUrl && <React.Fragment>
            <div className='footertext'>Мы попытались отправить вам ссылку на редактор, но Instagram Direct не позволил нам начать переписку с вами.</div>
            <div className='footertext'>Откройте наш аккаунт по ссылке <b><a href="https://instagram.com/free_link_creator" target="_blank">https://instagram.com/free_link_creator</a></b> и первыми, в Cообщении, напишите нам &laquo;СВИТИ&raquo; .</div>
            <div className='footertext'>Ваша ссылка будет сразу же отправлена в ответ на это сообщение.</div>
          </React.Fragment>}

          {recoverSent && !lastDate && !directUrl && <React.Fragment>
            <div className='footertext'>Мы отправили вашу ссылку для редактирования сайта в Instagram Direct @{name}. Проверьте Сообщения в Direct и вкладку Запросы от <b><a href="https://instagram.com/free_link_creator" target="_blank">https://instagram.com/free_link_creator</a></b>.</div>
          </React.Fragment>}
        </div>
      </Slider>
    </React.Fragment>
  );
};

Header.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  profile: PropTypes.string
};

Header.defaultProps = {
  avatar: null,
  name: '',
  className: undefined
};

export default Header;
