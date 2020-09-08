import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Avatar from 'components/common/Avatar';
import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import API, { getAdminSite } from 'utils/api';
import classnames from 'classnames'; 

import './index.scss';

const Header = ({ avatar, avatarPreview, name, className, profile }) => {
  const [cookies] = useCookies();
  const [editOpened, setEditOpened] = useState(false);
  const [recoverSent, setRecoverSent] = useState(false);
  const [recoverSending, setRecoverSending] = useState(false);
  const [lastDate, setLastDate] = useState(null);
  const [directUrl, setDirectUrl] = useState(null);
  const { active } = useSelector((state) => state.config.account);

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

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.isStandalone || document.referrer.includes('android-app://');

    const { title } = useSelector((state) => state.config.account);
    const { url } = useSelector((state) => state.config.data);

    const onShare = () => {
      navigator.share({
          title: {title}, // Заголовок
          text: 'Установи мое приложение по этой ссылке', // Текст
          url: window.location.href, // ссылка
        });
      };

  return (
    <React.Fragment>
      <header className={className}>
        <Avatar image={avatar} imagePreview={avatarPreview} />
        <div className="user-name" >{name|| "Твой бренд будет здесь"} </div>
        <span className="flex-delimiter" />
        
        {/* {!active && !isStandalone &&
        <Button onClick={handleClick} isInline className={classnames["pulse2", "tooltip"]}>
          <Icon type="edit" />
          {inviteId &&<span class="tooltip__text">Только вы можете редактировать эту страницу</span>}
        </Button>} */}

        {navigator.share && <Button onClick={onShare} isInline className={classnames["pulse2", "tooltip"]}>
          <Icon type="shareSquare" /></Button>}
      </header>
     
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
