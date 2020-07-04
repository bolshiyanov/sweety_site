import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Animated } from "react-animated-css";

import image0 from 'images/phone_style_0.png';


const Slide1 = () => {
    return (
        <React.Fragment>

            <Animated
                isVisible={true}>
                <img src={image0} />
            </Animated>


        </React.Fragment>
    );
};

export default Slide1;