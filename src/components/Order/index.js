import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'components/common/Slider';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Textarea from 'components/common/Textarea';
import './index.scss';

import { CATALOG_ORDER, CATALOG_ORDER_CLEAR } from 'constants/actions';
import API from 'utils/api';
import { __ } from 'utils/translation';
import { getSearchParams } from 'utils/url';
import { parse } from 'superagent';
import { translatedProperty } from 'utils/translation';

const Order = () => {
    const [orderOpened, setOrderOpened] = useState(false);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");
    const [sent, setSent] = useState(false);
    const { order } = useSelector((state) => state.config);
    const { catalogItems } = useSelector((state) => state.config.data);
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(null);
    const [orderProps, setOrderProps] = useState({});
    const [visualProps, setVisualProps] = useState([]);

    const { messengers } = useSelector((state) => state.config.data);
    const emailMessenger = messengers.filter(e => e.title === "Email")[0];
    const hasEmail = emailMessenger?.value;
    const params = getSearchParams(window.location.search);
    const { lang } = useSelector((state) => state.config.config);

    useEffect(() => {
        timer && timer > 0 && setTimeout(() => {
            if (!timer || timer <= 1) {
                setTimer(null);
                setSent(false);
                return;
            }
            setTimer(timer - 1);
        }, 1000);
    }, [timer]);

    useEffect(() => {
        const isPwa = params['pwa'] === "" || params['pwa'];
        const ignoredParams = ["pwa", "demo"];
        const props = {}
        const vprops = [];
        props[__(isPwa ? "Отправлено из установленного приложения" : "Отправлено с сайта", lang ?? "en")] = "";
        for (var propName in params) {
            if (propName && !ignoredParams.includes(propName)) {
                props[propName] = params[propName];
                vprops.push({ key: propName, value: params[propName] });
            }
        }
        setOrderProps(props);
        setVisualProps(vprops);
    }, []);


    const orderItems = [];
    for (var propName in order) {
        if (order[propName].count !== 0) {
            orderItems.push({
                guid: propName,
                count: order[propName].count,
                sum: order[propName].sum,
                currency: order[propName].currency
            });
        }
    }
    const orderSum = orderItems.length === 0 ? 0 :
        orderItems.reduce((a, e) => { return { sum: a.sum + e.sum } }).sum;
    const currency = orderItems[0]?.currency;

    if (orderSum === 0)
        return null;

    const handleClear = () => {
        dispatch({ type: CATALOG_ORDER_CLEAR });
    }

    const handleRemove = (orderItem) => {
        dispatch({
            type: CATALOG_ORDER,
            guid: orderItem.guid,
            count: 0,
            sum: 0,
            currency
        });
    }

    const handleSubmit = () => {
        setOrderOpened(false);
        let props = JSON.parse(JSON.stringify(orderProps));
        if (name) {
            props[__("Имя", lang ?? "en")] = name;
        }
        if (address) {
            props[__("Адрес", lang ?? "en")] = address;
        }

        API.sendOrder({
            items: orderItems.map(orderItem => {
                const catalogItem = catalogItems.filter(e => e.guid === orderItem.guid)[0];
                return {
                    number: catalogItem?.number,
                    text: translatedProperty(catalogItem, "text", lang ?? "en"),
                    price: catalogItem?.price ? parseFloat(catalogItem?.price) : null,
                    count: orderItem.count,
                    sum: parseFloat(orderItem.sum.toFixed(2)),
                    currency: orderItem.currency
                };
            }),
            total: parseFloat(orderSum.toFixed(2)),
            currency: currency,
            mobile: phone,
            comment,
            props
        }).then(() => {
            setTimer(30);
            setSent(true);
        });
    }

    return <React.Fragment>
        <div className="publish">

            {!sent && !orderOpened &&
                <Button className="publish__button"
                    onClick={() => setOrderOpened(true)}
                    noStyled>
                    {__("Ваш заказ на сумму:")} {orderSum.toFixed(2)} {currency}
                </Button>
            }
            {!sent && !orderOpened &&
                <div className="publish-notification"><b>{__("НАЖМИ, ЧТОБЫ ПОСМОТРЕТЬ ЗАКАЗ")}</b></div>
            }

            {sent &&
                <Button
                    className="publish__button__copy__already"
                    noStyled>
                    {__("Ваш заказ отправляется")}{timer % 3 === 0 ? "..." : timer % 3 === 1 ? ".." : "."}
                </Button>}


            {!sent && orderOpened &&
                <Slider
                    opened={orderOpened}
                    title={__("Ваш предварительный заказ")}
                    subtitle={__("Пожалуйста укажите контактную информацию и отправьте ваш заказ. Мы ответим вам в самое ближайшее время")}
                    submitTitle={__("ОТПРАВИТЬ").toUpperCase()}
                    onRemove={handleClear}
                    onClose={() => setOrderOpened(false)}
                    onSubmit={!hasEmail ? null : handleSubmit}
                >
                    {orderItems.map(orderItem => {
                        const catalogItem = catalogItems.filter(e => e.guid === orderItem.guid)[0];
                        return (
                            <div className="order__description" key={orderItem.guid}>
                                <Button className="order-remove" onClick={() => handleRemove(orderItem)}
                                    isInline noStyled>
                                    <Icon type="trash" noStyled />
                                </Button>
                                {catalogItem?.number ? <>&#8470;<b>{catalogItem?.number}</b> | </> : null}{catalogItem?.text}: &nbsp;
                                <b>{orderItem.count}</b> x {catalogItem?.price} {orderItem.currency} = {parseFloat(orderItem.sum).toFixed(2)} {orderItem.currency}</div>
                        );
                    })}
                    <div className="order__total">{__("Итого:")} {orderSum.toFixed(2)} {currency}</div>

                    {visualProps.map(e => <div className="order__prop" key={e.key}>{e.key}{e.value ? ": " : ""} {e.value}</div>)}
                    {visualProps.length > 0 ? <br /> : null}
                    {hasEmail && 
                    <React.Fragment>
                        <Input
                            className="order__input"
                            value={phone}
                            type="tel"
                            placeholder={__("Напишите свой телефон")}
                            onChange={(value) => setPhone(value)}
                        />
                        <Input
                            className="order__input"
                            value={name}
                            type="text"
                            placeholder={__("Напишите своё имя")}
                            onChange={(value) => setName(value)}
                        />
                        <Input
                            className="order__input"
                            value={address}
                            type="text"
                            placeholder={__("Напишите свой адрес")}
                            onChange={(value) => setAddress(value)}
                        />
                        <Textarea
                            className="order__input"
                            value={comment}
                            type="text"
                            placeholder={__("Напишите в этом поле комментарий к заказу, укажите альтернативный способ связи или задайте свой вопрос. ЗАПОЛНЕНИЕ НЕ ОБЯЗАТЕЛЬНО")}
                            onChange={(value) => setComment(value)}
                        />
                        <div className="order__input__descriptions">{__("Информация не будет передана третьим лицам")}</div>
                        <a href="#" onClick={() => window.open('sms:[`${phone}`]&body=[`${address}`]', '_self')} >order send!!!</a> <br />
                        <div>{address}{phone}</div>
                    
                    </React.Fragment>}

                </Slider>}
        </div>
    </React.Fragment>

};

export default Order;