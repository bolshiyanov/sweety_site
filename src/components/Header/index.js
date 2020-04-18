import React from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Avatar from 'components/common/Avatar';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { getAdminSite } from 'utils/api';

import './index.scss';

const Header = ({ avatar, name, className, profile }) => {
  const [cookies] = useCookies();

  var inviteId = cookies[profile];
  if (inviteId === "undefined") {
    inviteId = null;
  }

  const handleClick = () => {
    window.location.href = `${getAdminSite()}?invitationId=${inviteId}`;
  }

  return (
    <React.Fragment>
      <header className={className}>
        <Avatar image={avatar} />
        <span className="user-name">{name}</span>
        <span className="flex-delimiter" />
        { inviteId &&
        (<Button onClick={handleClick} isInline className="pulse2">
          <Icon type="edit" />
        </Button>)}
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
