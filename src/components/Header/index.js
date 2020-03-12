import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/common/Avatar';

import './index.scss';

const Header = ({ avatar, userName }) => {
  return (
    <React.Fragment>
      <header>
        <Avatar image={avatar} />
        <span className="user-name">{userName}</span>
        <span className="flex-delimiter" />
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string
};

Header.defaultProps = {
  avatar: null,
  userName: ''
};

export default Header;
