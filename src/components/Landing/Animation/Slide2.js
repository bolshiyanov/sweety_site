import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Animated } from "react-animated-css";

import image1 from 'images/phone_style_1.png';


const Slide2 = () => {
    return (
        <React.Fragment>

            <Animated
                animationInDelay={4400}
                animationIn="fadeInUp"
                animationInDuration={400}
                isVisible={true} >
                <img src={image1} />
            </Animated>


        </React.Fragment>
    );
};

export default Slide2;