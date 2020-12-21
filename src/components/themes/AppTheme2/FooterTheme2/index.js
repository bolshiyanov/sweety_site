import React from 'react';
import { IonIcon } from '@ionic/react';
import Button from 'components/common/Button';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';

import './index.scss';
const FooterTheme2 = ({ name }) => {

    const startUrl = 'https://dash.sweety.link'

    return (
        <React.Fragment>
            <footer>
                <Button onClick={() => { }} className="footer-theme2-background">
                    <div className="footer-theme2-background__flex">
                        <div className="footer-theme2-background__flex__flex2">
                        <div className="user-name" >{name} </div>
                            <div className="footer-theme2-brends-box-items">
                                <div className="brends-items"><IonIcon className="footer-theme2-brends-box-items-icon-icon" icon={logoPwa} /></div>
                                <div className="brends-items"><IonIcon size="small" icon={logoApple} /></div>
                                <div className="brends-items"><IonIcon size="small" icon={logoAndroid} /></div>
                                <div className="brends-items"><IonIcon size="amall" icon={logoWindows} /></div>
                            </div>
                            <a href={startUrl} className="textlogofooter">&reg;SWEETY.LINK&nbsp;2015-2020</a>
                            
                        </div>
                    </div>
                </Button>

            </footer>

        </React.Fragment>
    );
};

export default FooterTheme2;