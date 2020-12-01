import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Avatar from 'components/common/Avatar';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { __ } from 'utils/translation';
import API, { getAdminSite } from 'utils/api';
import classnames from 'classnames';

import './index.scss';

const HeaderTheme2 = ({ avatar, avatarPreview, name, className, profile }) => {
    const [cookies] = useCookies();
    const [editOpened, setEditOpened] = useState(false);
    const [recoverSent, setRecoverSent] = useState(false);
    const [recoverSending, setRecoverSending] = useState(false);
    const [lastDate, setLastDate] = useState(null);
    const [directUrl, setDirectUrl] = useState(null);
    const { active } = useSelector((state) => state.config.account);

    var inviteId = cookies[profile];
    if (inviteId === "undefined") {
        inviteId = null;
    }

    const handleClick = () => {
        if (inviteId) {
            window.location.href = `${getAdminSite()}?invitationId=${inviteId}`;
        } else {
            openEdit();
        }
    }

    const openEdit = () => {
        setEditOpened(true);
        return false;
    };

    const closeEdit = () => {
        setEditOpened(false);
    };

    const recover = (e) => {
        e.preventDefault();

        setRecoverSending(true);
        API.recoverPassword(profile).then((response) => {
            if (response?.lastDate) {
                const date = response?.lastDate;
                setLastDate(`${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`);
                setDirectUrl(response.directUrl);
            }
            setRecoverSent(true);
            setRecoverSending(false);
        });
    };

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.isStandalone || document.referrer.includes('android-app://');

    const { title } = useSelector((state) => state.config.account);
    const { url } = useSelector((state) => state.config.data);

    const onShare = () => {
        navigator.share({
            title: { title }, // Заголовок
            text: 'Установи мое приложение по этой ссылке', // Текст
            url: window.location.href, // ссылка
        });
    };

    return (
        <React.Fragment>
            <Button onClick={() => { }} className="header-theme2-background">
                <div className="header-theme2-background__flex">
                    <div className="header-theme2-background__flex__flex2">
                        <Avatar image={avatar} />
                        <div className="user-name" >{name || __("Твой бренд")} </div>
                    </div>
                </div>
               

            </Button>
        </React.Fragment>

    );
};

HeaderTheme2.propTypes = {
    noConfig: PropTypes.bool,
    avatar: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string
};

HeaderTheme2.defaultProps = {
    noConfig: false,
    avatar: undefined,
    name: undefined,
    className: undefined
};

export default HeaderTheme2;
