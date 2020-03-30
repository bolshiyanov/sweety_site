import React from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Avatar from 'components/common/Avatar';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { getInvite } from 'utils/api';

import './index.scss';

const Header = ({ avatar, userName, profile }) => {
  const [cookies, setCookie] = useCookies();

  var inviteId = getInvite();
  if (inviteId) {
    setCookie(profile, inviteId, { path: '/' });
  } else {
    inviteId = cookies[profile];
  }

  const handleClick = () => {
    window.location.href = `${host}?invitationId=${inviteId}`;
  }

  const host = "https://devadmin.itsinsta.site"; 

  return (
    <React.Fragment>
      <header>
        <Avatar image={avatar} />
        <span className="user-name">{userName}</span>
        <span className="flex-delimiter" />
        { inviteId &&
        (<Button onClick={handleClick} isInline className="pulse2">
          <Icon type="slidersH" />
        </Button>)}
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string,
  profile: PropTypes.string
};

Header.defaultProps = {
  avatar: null,
  userName: ''
};

export default Header;
