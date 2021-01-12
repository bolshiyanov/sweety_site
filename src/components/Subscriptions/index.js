import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import classnames from 'classnames';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';
import Input from 'components/common/Input';
import Accordeon from 'components/common/Accordeon';
import './index.scss';

const Subscriptions = ({
    data
}) => {
    const { name } = useSelector((state) => state.config.data);
    const { isSubscriber } = useSelector((state) => state.config);

    const [settingsOpened, setSettingsOpened] = useState(false);

    const openSubscriptionsSettings = () => {
        setSettingsOpened(true);
        return false;
    };
    const closeSubscriptionsSettings = () => {
        setSettingsOpened(false);
    };

    const getPeriodValue = (period) => {
        return parseInt(period.substr(0, period.length - 1));
    }

    const getTranslateTemplate = (period) => {
        if (["1d", "1m", "1y"].includes(period)) {
            return period.endsWith("d") ? "ПОДПИСКА НА 1 ДЕНЬ" :
                period.endsWith("m") ? "ПОДПИСКА НА 1 МЕСЯЦ" :
                period.endsWith("y") ? "ПОДПИСКА НА 1 ГОД" :
                "";
        }

        let count = getPeriodValue(period);
        if (count / 10 > 1 && count % 10 === 1) {
            return period.endsWith("d") ? "ПОДПИСКА НА {period} ДЕНЬ" :
                period.endsWith("m") ? "ПОДПИСКА НА {period} МЕСЯЦ" :
                period.endsWith("y") ? "ПОДПИСКА НА {period} ГОД" :
                "";
        } else if (count < 5 || (count / 10 > 1 && count % 10 < 5)) {
            return period.endsWith("d") ? "ПОДПИСКА НА {period} ДНЯ" :
                period.endsWith("m") ? "ПОДПИСКА НА {period} МЕСЯЦА" :
                period.endsWith("y") ? "ПОДПИСКА НА {period} ГОДА" :
                "";
        } else {
            return period.endsWith("d") ? "ПОДПИСКА НА {period} ДНЕЙ" :
                period.endsWith("m") ? "ПОДПИСКА НА {period} МЕСЯЦЕВ" :
                period.endsWith("y") ? "ПОДПИСКА НА {period} ЛЕТ" :
                "";
        }
    }

    const timer = '00:00:00';
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

    if (!data || data.length === 0 || isSubscriber) {
        return null;
    }

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


                    <Input
                        className="subscriptions-settings-settings-input"
                        // value={subscriptionemail}
                        type="email"
                        placeholder="e-mail"
                    // onChange={(value) => updateSettings('subscriptionemail', value)}
                    />
                    <div className="subscriptions-input-descriptions">{__("Укажите электронный адрес, на который будет отправлена ссылка на оплату. Также на этот адрес вы получите подтверждение оплаты и электронный чек.")}</div>
                    <div className="subscriptions-input-bottomline" />
                    <div className="subscriptions-title-rates">{__("ШАГ 2 из 2: ВЫБЕРИТЕ ТАРИФ")}</div>
                    
                    {data.map(s => <React.Fragment key={s.guid}>
                        <Button onClick={() => window.location = s.paymentUrl}>
                            <span>&nbsp;{s.title ?? __(getTranslateTemplate(s.period)).replace("{period}", getPeriodValue(s.period))}</span>
                        </Button>

                        <div className="subscriptions-input-descriptions">Стоимость составляет {s.amount} руб.</div>
                    </React.Fragment>)}

                    <div className="subscriptions-input-bottomline" />
                    <Accordeon items={items} />
                    <div className="subscriptions-textlogofooter" target="_blank" rel="noopener noreferrer" >&reg;{name}</div> <br /><br />
                </div>
            </Slider>

        </React.Fragment>

    );
}

export default Subscriptions