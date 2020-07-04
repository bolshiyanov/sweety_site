import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Animated } from "react-animated-css";

import image3 from 'images/phone_style_3.png';




const Slide3 = () => {


    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
      setTimeout(() => setIsVisible(false), 4000);
    }, [])
    return (
        <React.Fragment>


<Animated    
            animationIn="swing"
            animationInDuration={2000}

            animationOut="zoomOutDown"
            animationInDuration={1600} 
            isVisible={isVisible}>
              <img src={image3} />
            </Animated>
    

        </React.Fragment>
    );
};

export default Slide3;