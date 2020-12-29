import React, { useState } from 'react'
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import classnames from 'classnames';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';
import Input from 'components/common/Input';
import Accordeon from 'components/common/Accordeon';
import './index.scss';

const Subscriptions = ({ name }) => {

    const [settingsOpened, setSettingsOpened] = useState(false);

    const openSubscriptionsSettings = () => {
        setSettingsOpened(true);
        return false;
    };
    const closeSubscriptionsSettings = () => {
        setSettingsOpened(false);
    };
    const timer = '00:00:00';
    const nameMediSi = 'MediSi';
    const items = [
        {
            id: 'Term',
            title: __("Политика конфиденциальности, авторские права и условия использования"),
            component: (
                <div className='abouttext'>Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...Здесь текст политики...</div>
            )
        },
        {
            id: 'Offer',
            title: __("Договор оферта, условия оплаты, активации и возврата"),
            component: (
                <div className='abouttext'>Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...Здесь будет договор...</div>
            )
        }, {
            id: 'ask',
            title: __("Обратная связь и техническая поддержка"),
            component: (
                <div className='abouttext'>Здесь телефон, емаил и адрес физического офиса для отправки уведомлений</div>
            )
        },
    ]

    if (name == nameMediSi) {
        return (
            <React.Fragment>
                <div className="subscriptions">
                    <Button
                        key="add-button"
                        onClick={() => openSubscriptionsSettings('')}
                        className={classnames(['subscriptions-button', 'tech-button'])}
                    >
                        {/* <Icon type="plus" /> */}
                        <span>{__("ВАШИ ПОДПИСКИ")}</span>
                    </Button>
                </div>


                <Slider
                    opened={settingsOpened}
                    onClose={closeSubscriptionsSettings}
                    onSubmit={() => setSettingsOpened(false)}
                    title={__("Выберите свой тарифный план, чтобы прослушивать все аудио")}
                    subtitle={__("Мы рекомендуем продлевать свой тариф заранее, чтобы сохранить прогресс. До окончания оплаченного периода у Вас осталось:")}
                    timer={timer}
                >
                    <div className="subscriptions-body">
                        <div className="subscriptions-title-rates">{__("ШАГ 1 из 2: ВВЕДИТЕ СВОЙ ЕМАЙЛ")}</div>
                        <div className="subscriptions-input-bottomline" />

                        <Input
                            className="subscriptions-settings-settings-input"
                            // value={subscriptionemail}
                            type="email"
                            placeholder="e-mail"
                        // onChange={(value) => updateSettings('subscriptionemail', value)}
                        />
                        <div className="subscriptions-input-descriptions">{__("Укажите электронный адрес, на который будет отправлена ссылка на оплату. Также на этот адрес вы получите подтверждение оплаты и электронный чек.")}</div>

                        <div className="subscriptions-title-rates">{__("ШАГ 2 из 2: ВЫБЕРИТЕ ТАРИФ")}</div>
                        <Button
                            key="subscribes30days"
                            onClick={() => { }}
                        >
                            <span>&nbsp;{__("ПОДПИСКА НА 30 ДНЕЙ")}</span>
                        </Button>

                        <div className="subscriptions-input-descriptions">Стоимость подписки на 30 дней составляет 300 рублей.</div>
                        <Button
                            key="subscribes90days"
                            onClick={() => { }}
                        >
                            <span>&nbsp;{__("ПОДПИСКА НА 90 ДНЕЙ")}</span>
                        </Button>
                        <div className="subscriptions-input-descriptions">Стоимость подписки на 90 дней составляет 800 рублей.</div>
                        <Button
                            key="subscribes365days"
                            onClick={() => { }}
                        >
                            <span>&nbsp;{__("ПОДПИСКА НА 365 ДНЕЙ")}</span>
                        </Button>
                        <div className="subscriptions-input-descriptions">Стоимость подписки на 365 дней составляет 2500 рублей.</div>

                        <div className="subscriptions-input-bottomline" />
                        <Accordeon items={items} />
                        <div className="subscriptions-textlogofooter" target="_blank" rel="noopener noreferrer" >&reg;{name}</div> <br /><br />
                    </div>
                </Slider>

            </React.Fragment>

        );
    };

   return (null);
    
}

export default Subscriptions