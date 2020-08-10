import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'components/common/Slider';
import './index.scss';

const Order = () => {
    const [orderOpened, setOrderOpened] = useState(false);
    const { order } = useSelector((state) => state.config);
    const { catalogItems } = useSelector((state) => state.config.data);

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
        {!orderOpened && <div className="order" onClick={() => setOrderOpened(true)}>
            Ваш заказ на сумму: {sum.toFixed(2)} {currency}
        </div>}
        {orderOpened && <Slider
            opened={orderOpened}
            onClose={() => setOrderOpened(false)}
            onSubmit={() => setOrderOpened(false)}
            >
            {orderItems.map(orderItem => {
                const catalogItem = catalogItems.filter(e => e.guid === orderItem.guid)[0];
                return <div key={orderItem.guid}>{catalogItem?.text}: {catalogItem?.price}x{orderItem.count} = {orderItem.sum} {orderItem.currency}</div>
            })}
            Итого: {sum.toFixed(2)} {currency}
        </Slider>}
    </React.Fragment>
};

export default Order;