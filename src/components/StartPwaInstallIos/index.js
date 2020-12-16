import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from "react-qr-code";
import Icon from 'components/common/Icon';

import { IonIcon } from '@ionic/react';
import { shareOutline, star, starHalf } from 'ionicons/icons';
import { phonePortraitSharp, logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';

import logo512 from 'images/referrer_avatar.jpg';
import backgroundImage0 from 'images/background.jpg';
import { isIDevice } from 'utils/browser';
import PwaInstall from "components/PwaInstall";
import AppTheme2 from "components/themes/AppTheme2";
import AvatarBase from 'components/common/AvatarBase';
import { __ } from 'utils/translation';
import './index.scss';

const StartPwaInstallIos = ({ profile }) => {
    const { title, description, name, avatar, avatarPreview } = useSelector((state) => state.config.data);

    const onShare = () => {
        navigator.share({
            title: { title }, // Заголовок
            text: __("Установи это приложение по ссылке, через браузер [browser]").replace("[browser]", toBrowser), // Текст 
            url: window.location.href, // ссылка 
        });
    };
    const demoUrl = `${window.location.href}${window.location.href.indexOf("?") === -1 ? "?" : "&"}demo=preview`;
    const toBrowser = isIDevice() ? "Safari" : "Chrome";
    return (
        <React.Fragment>
            <div className="app-StartPwaInstallIos">
                <div className="app-container-StartPwaInstallIos">

                    <div className="startPwaInstallIos-heder">
                        <div className="startPwaInstallIos-heder-avatar-box" >
                            <AvatarBase avatar={avatar} avatarPreview={avatarPreview} avatarDefault={logo512} wrapperImageClass="startPwaInstallIos-heder-avatar" />
                        </div>

                        <div className="startPwaInstallIos-heder-right-box" >
                            <div className="startPwaInstallIos-heder-title">{title || "Sweety app creator"}</div>
                            <div className="startPwaInstallIos-heder-subtitle"><a href={demoUrl}>{__("Открыть без установки приложения")}</a></div>
                            <div className="startPwaInstallIos-heder-buttons-flexBox">
                                <div className="startPwaInstallIos-heder-button-install"><PwaInstall profile={profile} /></div>
                                {navigator.share &&
                                    <div className="startPwaInstallIos-heder-button-share" onClick={onShare}><Icon type="shareSquare" /></div>}
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
                            <div className="startPwaInstallIos-rating__descriptions">{__("235 Оценок")}</div>
                        </div>

                        <div className="startPwaInstallIos-ratingBox">
                            <div className="startPwaInstallIos-rating">{__("RU ")}
                            </div>
                            <div className="startPwaInstallIos-rating__descriptions">{__("Язык")}</div>
                        </div>

                        <div className="startPwaInstallIos-ratingBox">
                            <div className="startPwaInstallIos-rating">18+&nbsp;
                            </div>
                            <div className="startPwaInstallIos-rating__descriptions">{__("Возраст")}</div>
                        </div>
                    </div>

                    <div className="startPwaInstallIos-previewTitle">{__("Предпросмотр")}</div>

                    <div className="startPwaInstallIos-itemsBox">

                        <div className="startPwaInstallIos-itemsBox-items">
                            <div className="startPwaInstallIos-itemsBox-items__iframeBox">
                                <iframe scrolling="no" src={demoUrl} height="760px" width="400"></iframe>
                            </div>
                        </div>





                        <div className="startPwaInstallIos-itemsBox-items" >
                            <div className="startPwaInstallIos-itemsBox-items-title">{__("QR код приложения")}</div>
                            <QRCode size="200" value={`https://sweety.link/${profile}`} />
                        </div>

                    </div>


                    <div className="startPwaInstallIos-iconsBox">
                        <div className="startPwaInstallIos-iconsBox__phones"><ion-icon size="small" icon={phonePortraitSharp}></ion-icon>Phones with&nbsp;
                                <ion-icon size="small" icon={logoApple}></ion-icon>&nbsp;
                                <ion-icon size="small" icon={logoAndroid}></ion-icon>&nbsp;
                                <ion-icon size="small" icon={logoWindows}></ion-icon>&nbsp;
                                </div>
                        <div className="startPwaInstallIos-iconsBox__sutitle">{__("Поддерживается")}</div>
                    </div>

                    <div className="startPwaInstallIos-descriotionsTitle">{__("Описание")}
                        <div className="startPwaInstallIos-descriotions">
                            {title} &nbsp; {description}
                        </div>
                    </div>
                    <div className="startPwaInstallIos-descriotionsline" />


                    <div className="startPwaInstallIos-descriotionsTitle">{__("Дополнительно")}
                        <div className="startPwaInstallIos-descriotions">
                            <p> &mdash;&nbsp;{__("Установите наше приложение, чтобы вы могли в любой момент найти нас в своем телефоне. Вы будете получать накопительную скидку. Вы сможете узнать о наших акциях и горящих предложениях.")}
                            </p>

                        </div>
                    </div>
                    <div className="startPwaInstallIos-descriotionsline" />






                    <div className="startPwaInstallIos-infoTitle">{__("Информация")}</div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">{__("Авторские права")}</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right"> {name}</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">{__("Размер")}</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">1,8 Mb </div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">{__("Категория")}</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">{__("Для предпринимателей")}</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">{__("Язык")}</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">Русский</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">{__("Возраст")}</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right">18+</div>
                    </div>
                    <div className="startPwaInstallIos-infoFlexItems">
                        <div className="startPwaInstallIos-infoFlexItems__item-left">{__("Разработчик приложения")}</div>
                        <div className="startPwaInstallIos-infoFlexItems__item-right"> https://sweety.link ltd.Imec-Pro</div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    );
};


export default StartPwaInstallIos;