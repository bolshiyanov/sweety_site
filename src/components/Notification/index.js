import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useReactPWAInstall } from "react-pwa-install";

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import PwaInstall from "components/PwaInstall";
import PwaInstallIOs from "components/PwaInstallIOs";

import './index.scss';

const Notification = ({ profile }) => {
  const { supported, isInstalled } = useReactPWAInstall();
  const [cookies, setCookie] = useCookies();
  const appClosed = cookies[`${profile}_appclosed`];
  const [showNotification, setShowNotification] = useState(supported() && !isInstalled());

  const closeNotification = () => {
    alert(appClosed);
    setCookie(`${profile}_appclosed`, true, { path: '/' });
    setShowNotification(false);
  };

  return (
    <div className={classnames(['notification', { hidden: !showNotification }])}>
      <Button
        noStyled
        isInline
        className="notification__close"
        onClick={() => closeNotification()}
      >
        <Icon type="timesCircle" />
      </Button>
      <React.Fragment>
        <PwaInstall profile={profile} />
        <PwaInstallIOs profile={profile} />
      </React.Fragment>
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
