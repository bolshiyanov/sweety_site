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
                animationIn="bounceIn"
                animationInDelay={6000}
                animationInDuration={1000}

                animationOut="zoomOutDown"
                animationInDuration={1200}
            // isVisible={isVisible}
            >
                <div className="main-page__page1__container-anime__text1-flexBox">
                    <div className="main-page__page1__container-anime__text1-flexBox__text2">
                        Конструктор мобильных приложений
                        <div className="main-page__page1__container-anime__text1-flexBox__text3">
                         Создай сам за 10 минут, без программистов, без регистрации, без подписок. Кредитная карта не понадобится. 
                  </div>
                  </div>
                </div>
            </Animated>


        </React.Fragment>
    );
};

export default Slide4;