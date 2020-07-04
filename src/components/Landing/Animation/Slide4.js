import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Animated } from "react-animated-css";




const Slide4 = () => {


    // const [isVisible, setIsVisible] = useState(true);
    // useEffect(() => {
    //   setTimeout(() => setIsVisible(false), 6000);
    // }, [])
    return (
        <React.Fragment>


<Animated    
            animationIn="fadeIn"
            animationInDelay={7000}
            animationInDuration={1000}

            animationOut="zoomOutDown"
            animationInDuration={1200} 
            // isVisible={isVisible}
            >
              САМЫЙ ПРОДВИНУТЫЙ КОНСТРУКТОР ПРИЛОЖЕНИЙ ТЕПЕРЬ НА ТВОЕМ ТЕЛЕФОНЕ
            </Animated>
    

        </React.Fragment>
    );
};

export default Slide4;