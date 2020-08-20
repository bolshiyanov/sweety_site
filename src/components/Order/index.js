import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'components/common/Slider';
import Input from 'components/common/Input';
import Textarea from 'components/common/Textarea';
import './index.scss';

import { CATALOG_ORDER_CLEAR } from 'constants/actions';
import API from 'utils/api';

const Order = () => {
    const [orderOpened, setOrderOpened] = useState(false);
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [sent, setSent] = useState(false);
    const { order } = useSelector((state) => state.config);
    const { catalogItems } = useSelector((state) => state.config.data);
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(null);

    const { messengers } = useSelector((state) => state.config.data);
    const emailMessenger = messengers.filter(e => e.title === "Email")[0];
    const hasEmail = emailMessenger?.value;

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

    const sum = orderItems.length === 0 ? 0 :
        orderItems.reduce((a, e) => { return { sum: a.sum + e.sum } }).sum;
    const currency = orderItems[0]?.currency;

    if (sum === 0)
        return null;

    const handleClear = () => {
        dispatch({ type: CATALOG_ORDER_CLEAR });
    }

    const handleSubmit = () => {
        setOrderOpened(false);

        API.sendOrder({
            items: orderItems.map(orderItem => {
                const catalogItem = catalogItems.filter(e => e.guid === orderItem.guid)[0];
                return {
                    number: catalogItem?.number,
                    text: catalogItem?.text,
                    price: catalogItem?.price ? parseFloat(catalogItem?.price) : null,
                    count: orderItem.count,
                    sum: parseFloat(orderItem.sum.toFixed(2)),
                    currency: orderItem.currency
                };
            }),
            total: parseFloat(sum.toFixed(2)),
            currency: currency,
            mobile: phone,
            comment
        }).then(() => {
            setTimer(30);
            setSent(true);
        });
    }

    return <React.Fragment>
        {!sent && !orderOpened && 
        <div className="order"
         onClick={() => setOrderOpened(true)}>
            Ваш заказ на сумму: {sum.toFixed(2)} {currency}
        </div>}
        {sent && 
        <div className="order">
            Ваш заказ отправлен{timer % 3 === 0 ? "..." : timer % 3 === 1 ? ".." : "."}
        </div>}
        {!sent && orderOpened && 
        <Slider
            opened={orderOpened}
            title="Ваш предварительный заказ"
            subtitle="Пожалуйста, отредактируйте количество интересующих позиций, укажите контактную информацию и отправьте ваш заказ. Мы ответим вам в самое ближайшее время"
            submitTitle="ОТПРАВИТЬ"
            onRemove={handleClear}
            onClose={() => setOrderOpened(false)}
            onSubmit={!hasEmail ? null : handleSubmit}
            >
            {orderItems.map(orderItem => {
                const catalogItem = catalogItems.filter(e => e.guid === orderItem.guid)[0];
                return (
                <div className="order__description" key={orderItem.guid}> &#8470;<b>{catalogItem?.number}</b> | {catalogItem?.text}: &nbsp; 
                <b>{orderItem.count}</b> x {catalogItem?.price} {orderItem.currency}  =  
                {orderItem.sum} {orderItem.currency}</div>
                );
            })}
            
            <div className="order__total">Итого: {sum.toFixed(2)} {currency}</div>
            {hasEmail && <React.Fragment>
                <Input 
                    className="order__input"
                    value={phone}
                    type="text"
                    placeholder="Напишите свой телефон"
                    onChange={(value) => setPhone(value)}
                />
                <Textarea
                    className="order__input"
                    value={comment}
                    type="text"
                    placeholder="Напишите в этом поле комментарий к заказу, укажите альтернативный способ связи, или задайте свой вопрос. ЗАПОЛНЕНИЕ НЕ ОБЯЗАТЕЛЬНО"
                    onChange={(value) => setComment(value)}
                />
                <div className="order__input__descriptions">Информация не будет передана третьим лицам</div>
               
            </React.Fragment>} 
            
        </Slider>}
    </React.Fragment>
};

export default Order;