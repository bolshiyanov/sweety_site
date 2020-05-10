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
        <div>
          {!recoverSent && <React.Fragment>
            <div>Для входа в режим редактирования страницы вам будет отправлена секретная ссылка в Instagram Direct <b>@{name}</b> от пользователя <b>@sweety_link</b>.</div>
            <div>Убедитесь, что вы подписаны на наш аккаунт <b>@sweety_link</b></div>
            <Button className="recovery__button" onClick={recover}>{!recoverSending ? "Отправить ссылку" : "Отправляем ссылку..."}</Button>
          </React.Fragment>}

          {lastDate && <React.Fragment>
            <div>Ранее {lastDate} в Instagram Direct вам была отправлена ссылка на ваш редактор сайта. Пожалуйста, проверьте сообщения и вкладку Запросы от @sweety_link на эту дату.</div>
            <div>Если вы не смогли найти ссылку, пожалуйста, отправьте сообщение в произвольной форме на @sweety_link: ссылка будет продублирована в течение 24 часов.</div>
          </React.Fragment>}
          
          {recoverSent && !lastDate && <React.Fragment>
            <div>Мы отправили ссылку для редактирования сайта в Instagram Direct @{name}. Проверьте сообщения в Direct и вкладку Запросы.</div>
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
