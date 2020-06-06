import React, { useState, useEffect } from 'react';
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
  const [cookies, setCookie, removeCookie] = useCookies();
  const appClosedCookie = cookies[`${profile}_appclosed`];
  const appClosed = !!appClosedCookie && appClosedCookie === "1";
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(supported() && !isInstalled() && !appClosed);
  });

  const closeNotification = () => {
    setCookie(`${profile}_appclosed`, "1", { path: '/' });
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
      <PwaInstall profile={profile} />
      <PwaInstallIOs profile={profile} />
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
