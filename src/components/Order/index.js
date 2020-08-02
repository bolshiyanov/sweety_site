import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'components/common/Slider';
import './index.scss';

const Order = () => {

    return (
        <React.Fragment>
            <div className="order" onClick={() => { }}>
                Ваш заказ на сумму:
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