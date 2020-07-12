import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { EDIT_MESSENGERS_DATA } from 'constants/actions';

import './index.scss';

const Messengers = () => {
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [data, setData] = useState([]);

    const openMessengerSettings = () => {
        setSettingsOpened(true);
    };

    const closeMessengerSettings = () => {
        setSettingsOpened(false);
    };

    const handleChangeItem = (item, value) => {
        setData(data.map((messenger) => (messenger.title === item ? { ...messenger, value } : messenger)));
    };

    const dispatch = useDispatch();
    const applyMessengersSettings = () => {
        dispatch({ type: EDIT_MESSENGERS_DATA, data });
        closeMessengerSettings();
    };

    const { messengers } = useSelector((state) => state.config.data);
    const { active, paymentData } = useSelector((state) => state.config.account);
    useEffect(() => {
        setData(messengers);
    }, [messengers]);

    const filteredMessengers = data.filter((messenger) => messenger.value !== '');

    const showAddButton = filteredMessengers.length === 0;
    //|| (filteredMessengers.length === 1 && filteredMessengers[0].title === 'Instagram');

    return (
        <React.Fragment>
            <div className="messengers-theme2">
                {
                    filteredMessengers.map((messenger) => (
                        <Button
                            key={messenger.title}
                            className="messenger-theme2"
                            onClick={openMessengerSettings}
                        >
                            <Icon type={messenger.icon} />
                        </Button>
                    ))
                }
                {showAddButton && (
                    <Button
                        key="whatsapp"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="whatsapp" />
                    </Button>
                )}
                {showAddButton && (
                    <Button
                        key="facebook"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="facebook" />
                    </Button>
                )}
                {showAddButton && (
                    <Button
                        key="telegram"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="telegram" />
                    </Button>
                )}
                {showAddButton && (
                    <Button
                        key="instagram"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="instagram" />
                    </Button>
                )}
                {showAddButton && (
                    <Button
                        key="viber"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="viber" />
                    </Button>
                )}
                {showAddButton && (
                    <Button
                        key="envelope"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="envelope" />
                    </Button>
                )}
                {showAddButton && (
                    <Button
                        key="skype"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="skype" />
                    </Button>
                )}
                {showAddButton && (
                    <Button
                        key="phone"
                        className="messenger-theme2"
                        onClick={openMessengerSettings}
                    >
                        <Icon type="phone" />
                    </Button>
                )}

            </div>
        </React.Fragment>
    );
};

export default Messengers;