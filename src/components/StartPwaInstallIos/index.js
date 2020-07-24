import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from "react-qr-code";


import { IonIcon } from '@ionic/react';
import { shareOutline, star, starHalf } from 'ionicons/icons';
import { phonePortraitSharp, logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';

import logo512 from 'images/referrer_avatar.jpg';
import backgroundImage0 from 'images/background.jpg';

import PwaInstall from "components/PwaInstall";

import './index.scss';



const StartPwaInstallIos = ({ profile }) => {
    const { title, description, name, avatar } = useSelector((state) => state.config.data);

    const onShare = () => {
        navigator.share({
            title: { title }, // Заголовок
            text: 'Установи это приложение по ссылке', // Текст
            url: window.location.href, // ссылка
        });
    };


    return (
        <React.Fragment>
            <div className="app-StartPwaInstallIos">
                <div className="app-container-StartPwaInstallIos">

                    <div className="startPwaInstallIos-heder">
                        <div className="startPwaInstallIos-heder-avatar-box" >
                            <div className="startPwaInstallIos-heder-avatar" style={{ backgroundImage: `URL(${avatar || logo512})` }} />
                        </div>

                        <div className="startPwaInstallIos-heder-right-box" >
                            <div className="startPwaInstallIos-heder-title">{title || "Твой бренд из настроек"}</div>
                            <div className="startPwaInstallIos-heder-subtitle">Официальное приложение </div>
                            <div className="startPwaInstallIos-heder-buttons-flexBox">
                                <div className="startPwaInstallIos-heder-button-install"><PwaInstall profile={profile} /></div>
                                {navigator.share && <div className="startPwaInstallIos-heder-button-share" onClick={onShare}><IonIcon size="large" icon={shareOutline} /></div>}
                            </div>
                        </div>
                    </div>

                    <div className="startPwaInstallIos-secondBox">
                        <div className="startPwaInstallIos-ratingBox">
                            <div className="startPwaInstallIos-rating">4,8&nbsp;
                                <ion-icon size="small" icon={star}></ion-icon>
                                <ion-icon size="small" icon={star}></ion-icon>
                                <ion-icon size="small" icon={star}></ion-icon>
                                <ion-icon size="small" icon={star}></ion-icon>
                                <ion-icon size="small" icon={starHalf}></ion-icon>
                            </div>
                            <div className="startPwaInstallIos-rating__descriptions">235 оценок</div>
                        </div>

                        <div className="startPwaInstallIos-ratingBox">
                            <div className="startPwaInstallIos-rating">RU&nbsp;
                            </div>
                            <div className="startPwaInstallIos-rating__descriptions">Язык</div>
                        </div>

                        <div className="startPwaInstallIos-ratingBox">
                            <div className="startPwaInstallIos-rating">18+&nbsp;
                            </div>
                            <div className="startPwaInstallIos-rating__descriptions">Возраст</div>
                        </div>
                    </div>

                    <div className="startPwaInstallIos-previewTitle">Предпросмотр</div>
                    
                    <div className="startPwaInstallIos-itemsBox">

                        <div className="startPwaInstallIos-itemsBox__items"
                            style={{ backgroundImage: `URL(https://api.sweety.link/api/profiles/${profile}/screenshot)` }}>

                            <div className="startPwaInstallIos-itemsBox__items__title">Приложение</div>
                        </div>

                        <div className="startPwaInstallIos-itemsBox__items" >
                            <div className="startPwaInstallIos-itemsBox__items__title">QR код приложения</div>
                            <QRCode size="200" value={`https://sweety.link/${profile}`} />
                        </div>

                    </div>


                    <div className="startPwaInstallIos-iconsBox">
                        <div className="startPwaInstallIos-iconsBox__phones"><ion-icon size="small" icon={phonePortraitSharp}></ion-icon>Phones with&nbsp;
                                <ion-icon size="small" icon={logoApple}></ion-icon>&nbsp;
                                <ion-icon size="small" icon={logoAndroid}></ion-icon>&nbsp;
                                <ion-icon size="small" icon={logoWindows}></ion-icon>&nbsp;
                                </div>
                        <div className="startPwaInstallIos-iconsBox__sutitle">Поддерживается</div>
                    </div>

                    <div className="startPwaInstallIos-descriotionsTitle">Описание
                    <div className="startPwaInstallIos-descriotions">
                            {title} &nbsp; {description}
                        </div>
                    </div>
                    <div className="startPwaInstallIos-descriotionsline" />


                    <div className="startPwaInstallIos-descriotionsTitle">Дополнительно
                    <div className="startPwaInstallIos-descriotions">
                            <p> &mdash;&nbsp;Установите наше приложение, чтобы вы могли в любой момент найти нас в своем телефоне.
                            </p>

                        </div>
                    </div>
                    <div className="startPwaInstallIos-descriotionsline" />






                    <div className="startPwaInstallIos-infoTitle">Информация</div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left"> Авторские права</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right"> {name}</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">Размер  </div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">1,8 МБ </div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">Категория</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">Малый бизнес</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">Языки</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">Русский</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">Возраст</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">18+</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">Разработчик приложения</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right"> ООО "Профессиональная бизнес сеть Имек"</div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    );
};


export default StartPwaInstallIos;