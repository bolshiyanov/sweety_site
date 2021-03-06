import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Animated } from "react-animated-css";

import {__} from "utils/translation";

const Slide4 = () => {


    // const [isVisible, setIsVisible] = useState(true);
    // useEffect(() => {
    //   setTimeout(() => setIsVisible(false), 6000);
    // }, [])
    return (
        <React.Fragment>


            <Animated
                animationIn="fadeIn"
                animationInDelay={6000}
                animationInDuration={1000}

                animationOut="zoomOutDown"
                animationInDuration={3200}
            // isVisible={isVisible}
            >
                <div className="main-page__page1__container-anime__button-slide7-flexBox">
                    <div className="main-page__page1__container-anime__button-slide7-flexBox__button-slide7 button-slide7">
                    {__("START").toUpperCase()}
                       <div className="subtitle-slide7">{__("without template").toLowerCase()}</div>
                    </div>
                </div>
            </Animated>


        </React.Fragment>
    );
};

export default Slide4;