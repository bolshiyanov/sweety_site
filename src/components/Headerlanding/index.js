import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Avatar from 'components/common/Avatar';
import API, { getAdminSite } from 'utils/api';

import './index.scss';

const Headerlanding = ({ avatar, name, className, profile }) => {
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

  
  const openEdit = () => {
    setEditOpened(true);
    return false;
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
      </header>
    </React.Fragment>
  );
};

Headerlanding.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  profile: PropTypes.string
};

Headerlanding.defaultProps = {
  avatar: null,
  name: '',
  className: undefined
};

export default Headerlanding;