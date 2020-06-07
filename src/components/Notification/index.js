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
  const [showNotification, setShowNotification] = useState(true);
  const [showNotification2, setShowNotification2] = useState(true);

  useEffect(() => {
    setShowNotification2(supported() && !isInstalled());
  }, []);

  const closeNotification = () => {
    alert(JSON.stringify({
      supported: supported(),
      isInstalled: isInstalled(),
      showNotification2,
      cookie: cookies[`${profile}_appclosed`]
    }));
    var date = new Date();
    date.setDate(date.getDate() + 14);
    setCookie(`${profile}_appclosed`, "1", { 
      path: '/',
      expires: date
    });
    removeCookie(`${profile}_appclosed`, { path: '/' });
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
