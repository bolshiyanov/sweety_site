import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import classnames from 'classnames';

import history from 'utils/history';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import './index.scss';

const Notification = ({ message, link, url, buttonTitle, profile }) => {
  const [showNotification, setShowNotification] = useState(true);
  const [cookies] = useCookies();

  if (!message)
    return null;

  const inviteId = cookies[profile];

  const copyToClipboard = () => {
    if (url) {
      if (url.substr(0, 4) === 'http') {

        if (!inviteId)
          window.location.href = url;
        else {
          window.location.href = `${url}?invitationId=${inviteId}`;
        }
      }
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
      {message}<br/>
      {(link || url) && inviteId &&
        <React.Fragment>
          {link && <a
            className="notify-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>}
          {buttonTitle && <Button
            toClipboard={link}
            className="notify-button"
            onClick={copyToClipboard}
            noStyled
          >
            {buttonTitle}
          </Button>}
        </React.Fragment>
      }
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
