import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import history from 'utils/history';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';


import PwaInstall from "components/PwaInstall";
import PwaInstallIOs from "components/PwaInstallIOs";

import './index.scss';

const Notification = ({ profile }) => {
  const [showNotification, setShowNotification] = useState(true);
  const [cookies] = useCookies();

 

  const inviteId = cookies[profile];

  

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
      
        <React.Fragment>
        {profile !== "za_ruku_k_yugu" ? null : <PwaInstall profile={profile} />}
        {profile !== "za_ruku_k_yugu" ? null : <PwaInstallIOs profile={profile} />}
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
