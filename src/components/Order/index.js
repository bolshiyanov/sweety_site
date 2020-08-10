import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'components/common/Slider';
import Input from 'components/common/Input';
import './index.scss';

const Order = () => {
    const [orderOpened, setOrderOpened] = useState(false);
    const { order, number } = useSelector((state) => state.config);
    const { catalogItems } = useSelector((state) => state.config.data);

    const numberTelephone = "";

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

    return <React.Fragment>
        {!orderOpened && 
        <div className="order"
         onClick={() => setOrderOpened(true)}>
            Ваш заказ на сумму: {sum.toFixed(2)} {currency}
        </div>}
        {orderOpened && 
        <Slider
            opened={orderOpened}
            title="Ваш предварительный заказ"
            subtitle= "Пожалуйста отредактируйте количество интересующих позиций, укажите контактную информацию и отправьте ваш заказ. Мы ответим вам в самое ближайшее время"
            onRemove={() => setOrderOpened(false)}
            onClose={() => setOrderOpened(false)}
            onSubmit={() => setOrderOpened(false)}
            onSend={() => setOrderOpened(false)}

            >
            {orderItems.map(orderItem => {
                const catalogItem = catalogItems.filter(e => e.guid === orderItem.guid)[0];
                return (
                <div className="order__description" key={orderItem.guid}> &#8470;<b>{catalogItem?.number}</b> | {catalogItem?.text}: &nbsp; 
                <b>{orderItem.count}</b>ед. x {catalogItem?.price} {orderItem.currency}  =  
                {orderItem.sum} {orderItem.currency}</div>
                );
            })}
            
            <div className="order__total">Итого: {sum.toFixed(2)} {currency}</div>
            <Input
            className="story-settings__settings__input"
            value={numberTelephone}
            type="text"
            placeholder="Напишите свой телефон"
            onChange={(value) => ('numberTelephone', value)}
          />
          <div className="story-input-descriptions">Информация не будет передана третьим лицам</div>
        </Slider>}
    </React.Fragment>
};

export default Order;