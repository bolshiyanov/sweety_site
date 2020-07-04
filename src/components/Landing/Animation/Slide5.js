import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Animated } from "react-animated-css";

import image5 from 'images/phone_style_5.png';


const Slide5 = () => {
    return (
        <React.Fragment>

            <Animated
                animationInDelay={4400}
                animationIn="fadeInUp"
                animationInDuration={400}
                isVisible={true} >
                <img src={image5} />
            </Animated>


        </React.Fragment>
    );
};

export default Slide5;