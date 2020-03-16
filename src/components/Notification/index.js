import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import classnames from 'classnames';

import history from 'utils/history';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import './index.scss';

const Notification = ({ message, link, url, buttonTitle }) => {
  const [showNotification, setShowNotification] = useState(true);

  if (!message)
    return null;

  const copyToClipboard = () => {
    if (url) {
      if (url.substr(0, 4) === 'http')
        window.location.href = url;
      else
        history.push(url);
    }
    else {
      copy(link);
      setShowNotification(false);
    }
  };

  return (
    <div className={classnames(['notification', { hidden: !showNotification }])}>
      <Button
        noStyled
        isInline
        className="notification__close"
        onClick={() => setShowNotification(false)}
      >
        <Icon type="timesCircle" />
      </Button>
      {message}
      {link && (
        <React.Fragment>
          <a
            className="notify-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
          <Button
            toClipboard={link}
            className="notify-button"
            onClick={copyToClipboard}
            noStyled
          >
            {buttonTitle}
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  link: PropTypes.string,
  url: PropTypes.string,
  buttonTitle: PropTypes.string
};

Notification.defaultProps = {
  message: null,
  link: null,
  url: '',
  buttonTitle: 'Copy to clipboard'
};

export default Notification;
