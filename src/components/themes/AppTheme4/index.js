import React from 'react';


import { useSelector } from 'react-redux';
import CookieBanner from 'react-cookie-banner';
import AvatarTheme4 from 'components/themes/AppTheme4/AvatarTheme4';
import TitleTheme4 from 'components/themes/AppTheme4/TitleTheme4';
import MessengersTheme4 from 'components/themes/AppTheme4/MessengersTheme4';
import StoriesTheme4 from 'components/themes/AppTheme4/StoriesTheme4';
// import FooterTheme4 from 'components/themes/AppTheme4/FooterTheme4';
import PwaInstall from "components/PwaInstall";
import { getInvite } from 'utils/api';
import PwaInstallIOs from "components/PwaInstallIOs";
import './index.scss';


const AppTheme4 = () => {

    const { data = {} } = useSelector((state) => state.config);
    const { currentTheme } = useSelector((state) => state.config);
    const { config } = useSelector((state) => state.config);
    

    const { settings = {} } = data;
    const { constructor } = config;
    const backgroundStyles = currentTheme.getBackgroundStyles();
    const inviteId = getInvite();

    const ua = navigator.userAgent || navigator.vendor || navigator.opera;
    if (ua.indexOf("Instagram") > -1 && !(ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
        window.location.href = `https://api.sweety.link/redirect/dummy/?invitationId=${inviteId}`;
        return null;
    }

    return (
        <React.Fragment>
            <div className="app-theme4" style={backgroundStyles}>
                <div className="app-background-theme4" >
                    <div className="app-container-theme4">
                        <AvatarTheme4 />
                        <MessengersTheme4 />
                            <TitleTheme4 />
                            <StoriesTheme4 data={data.stories} />
                        
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
};

export default AppTheme4;