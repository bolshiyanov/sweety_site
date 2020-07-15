import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import './index.scss';

const MessengersTheme4 = () => {
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
            <div className="messengers-theme4-box">
                <div className="messengers-theme4">
                    {
                        filteredMessengers.map((messenger) => (
                            <Button
                                key={messenger.title}
                                className="messenger-theme4"
                                onClick={() => showContact(messenger.value)}
                            >
                                <Icon type={messenger.icon} />
                            </Button>
                        ))
                    }

                    {!data.length > 0 && (
                        <Button
                            key="whatsapp"
                            className="messenger-theme4"
                            onClick={() => { }}
                        >
                            <Icon type="whatsapp" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="telegram"
                            className="messenger-theme4"
                            onClick={() => { }}
                        >
                            <Icon type="telegram" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="envelope"
                            className="messenger-theme4"
                            onClick={() => { }}
                        >
                            <Icon type="envelope" />
                        </Button>
                    )}
                    {!data.length > 0 && (
                        <Button
                            key="phone"
                            className="messenger-theme4"
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

export default MessengersTheme4;