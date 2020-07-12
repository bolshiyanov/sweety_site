import React from 'react';

import { useSelector } from 'react-redux';
import StoriesTheme1 from 'components/themes/AppTheme1/StoriesTheme1';

import { getInvite } from 'utils/api';
import PwaInstall from "components/PwaInstall";
import PwaInstallIOs from "components/PwaInstallIOs";

import AvatarTheme1 from 'components/themes/AppTheme1/AvatarTheme1';

import './index.scss';

const AppTheme1 = () => {
    const { data = {} } = useSelector((state) => state.config);
    const { currentTheme } = useSelector((state) => state.config);
    const { config } = useSelector((state) => state.config);
    const { active } = useSelector((state) => state.config.account);

    const { settings = {} } = data;
    const { avatar } = config;

    const backgroundStyles = currentTheme.getBackgroundStyles();
    const inviteId = getInvite();

    const ua = navigator.userAgent || navigator.vendor || navigator.opera;
    if (ua.indexOf("Instagram") > -1 && !(ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
        window.location.href = `https://api.sweety.link/redirect/dummy/?invitationId=${inviteId}`;
        return null;
    }



    return (
        <div className="app-theme1" style={backgroundStyles}> 
            <div className="app-container-theme1">
                <AvatarTheme1 image={avatar} />
                <StoriesTheme1 data={data.stories} />
                <PwaInstallIOs />
                <PwaInstall />
            </div>
        </div>
    );
};

export default AppTheme1;
