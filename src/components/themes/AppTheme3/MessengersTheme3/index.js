import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { EDIT_MESSENGERS_DATA } from 'constants/actions';

import './index.scss';

const MessengersTheme3 = () => {
    const [data, setData] = useState([]);

    const { messengers } = useSelector((state) => state.config.data);

    useEffect(() => {
        setData(messengers);
    }, [messengers]);

    const filteredMessengers = data.filter((messenger) => messenger.value !== '');

    const showContact = (link) => {
        if (link.startsWith('tel:') || link.startsWith('mailto:') || link.startsWith('sms:')) {
            window.location.href = link;
        }
        else {
            window.open(link, "_blank");
        }
    };

    return (
        <React.Fragment>
            <div className="messengers-theme3-box">
                <div className="messengers-theme3">
                    {
                        filteredMessengers.map((messenger) => (
                            <Button
                                key={messenger.title}
                                className="messenger-theme3"
                                onClick={() => showContact(messenger.value)}
                            >
                                <Icon type={messenger.icon} />
                            </Button>
                        ))
                    }

                    {!data.length > 0 && (
                        <Button
                            key="whatsapp"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="whatsapp" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="facebook"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="facebook" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="telegram"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="telegram" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="instagram"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="instagram" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="viber"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="viber" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="envelope"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="envelope" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="skype"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="skype" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="phone"
                            className="messenger-theme3"
                            onClick={() => { }}
                        >
                            <Icon type="phone" />
                        </Button>
                    )}

                </div>
            </div>
        </React.Fragment>
    );
};

export default MessengersTheme3;