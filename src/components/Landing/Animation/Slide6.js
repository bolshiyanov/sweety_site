import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Animated } from "react-animated-css";

import image6 from 'images/phone_style_6.png';


const Slide6 = () => {
    return (
        <React.Fragment>

            <Animated
                animationInDelay={5400}
                animationIn="fadeIn"
                animationInDuration={1200}
                isVisible={true} >
                <img src={image6} />
            </Animated>


        </React.Fragment>
    );
};

export default Slide6;