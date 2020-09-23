import React from "react";
import { DialogActions, Typography, Button, Box } from "@material-ui/core";
import { platforms } from "./platforms";
import { IOSShareIcon, FireFoxA2HSIcon, OperaMenuIcon, OperaA2HSIcon } from "./icons";
import Icon from 'components/common/Icon';
import { IonIcon } from '@ionic/react';
import { shareOutline } from 'ionicons/icons';
import {__} from 'utils/translation';
import { isWebView } from 'utils/browser';

export default function InstallDialogAction(props) {
  return (
    <>
      <DialogActions>
        {props.platform === platforms.NATIVE && props.nativeInstall && (
          <>
            <Button onClick={props.onClose}>{__("Отменить")}</Button>
            <Button onClick={props.onSubmit} color="primary" variant="contained" disableElevation>
              {__("Установить")}
            </Button>
          </>
        )}
        {props.platform === platforms.IDEVICE && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">{__("Для установки этого приложения:")}</Typography>
              <ul>
                {isWebView() && 
                  <>
                    <li>{__("Открой в Safari")} <Icon className="icon-16" type="compass" /></li>
                    <li>{__("Затем нажми")} <IonIcon slot="start" icon={shareOutline } /></li>
                  </>}
                {!isWebView() && <li>{__("Нажми")} <IonIcon slot="start" icon={shareOutline } /></li>}
                <li>{__("Затем нажми")} <Icon className="icon-16" type="plusSquare" /> - {__("На экран 'Домой'")}</li>
              </ul>
              {window.navigator.userAgent}
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.FIREFOX && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">{__("Для установки этого приложения:")}</Typography>
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {__("Нажми на эту иконку в адресной строке:")}
                    <FireFoxA2HSIcon />
                  </span>
                </li>
                <li>{__("Затем нажми")} '+{__("Добавить на главный экран")}'</li>
              </ul>
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.OPERA && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">{__("Для установки этого приложения:")}</Typography>
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {__("Нажми на кнопку меню:")}
                    <OperaMenuIcon />
                  </span>
                </li>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {__("Затем нажми")} &nbsp;'
                    <OperaA2HSIcon />
                    {__("Главный экран")}'
                  </span>
                </li>
              </ul>
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.NATIVE && !props.nativeInstall && isWebView() && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>{__("К сожалению, установка не поддерживается из вашего приложения. Открой это приложение в браузере Google Chrome")}</Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onClose}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.NATIVE && !props.nativeInstall && !isWebView() && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>{__("К сожалению, установка не поддерживается из анонимного режима. Открой это приложение в обычном режиме Google Chrome")}</Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onClose}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.OTHER && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>{__("К сожалению, установка не поддерживается в вашем браузере. Открой это приложение в браузере Google Chrome")}</Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onClose}>Ok</Button>
            </Box>
          </Box>
        )}
      </DialogActions>
    </>
  );
}
