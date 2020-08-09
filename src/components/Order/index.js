import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'components/common/Slider';
import './index.scss';

const Order = () => {
    const { order } = useSelector((state) => state.config);
    const orderItems = [];
    for (var propName in order) {
        orderItems.push({ 
            guid: order[propName].guid, 
            count: order[propName].count, 
            sum: order[propName].sum,
            currency: order[propName].currency
        });
    }

    const sum = orderItems.length === 0 ? 0 :
        orderItems.reduce((a, e) => { return { sum: a.sum + e.sum } }).sum;
    const currency = orderItems[0]?.currency;

    if (sum === 0)
        return null;

    return (
        <React.Fragment>
            <div className="order" onClick={() => { }}>
                Ваш заказ на сумму: {sum > 0 ? sum.toFixed(2) : null} {currency}
        </div>
        </React.Fragment>
    );
    // <Slider
    //     opened={settingsOpened}
    //     onClose={closeStoriesSettings}
    //     onSubmit={closeStoriesSettings}
    //   >
    //     <StorySettings {...storyData} />
    //   </Slider>
};

export default Order;