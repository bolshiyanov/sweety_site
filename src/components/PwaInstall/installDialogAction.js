import React from "react";
import { DialogActions, Typography, Button, Box } from "@material-ui/core";
import { platforms } from "./platforms";
import { IOSShareIcon, FireFoxA2HSIcon, OperaMenuIcon, OperaA2HSIcon } from "./icons";
import Icon from 'components/common/Icon';
import { IonIcon } from '@ionic/react';
import { shareOutline } from 'ionicons/icons';

export default function InstallDialogAction(props) {
  return (
    <>
      <DialogActions>
        {props.platform === platforms.NATIVE && (
          <>
            <Button onClick={props.onClose}>Отменить</Button>
            <Button onClick={props.onSubmit} color="primary" variant="contained" disableElevation>
              Установить
            </Button>
          </>
        )}
        {props.platform === platforms.IDEVICE && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">Для установки этого приложения:</Typography>
              <ul>
                <li>Открой в Safari <Icon className="icon-16" type="compass" /></li> 
                <li>Затем нажми <IonIcon slot="start" icon={shareOutline } /></li>
                <li>Затем жми <Icon className="icon-16" type="plusSquare" /> - На экран "Домой"</li>
              </ul>
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.FIREFOX && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">Для установки этого приложения:</Typography>
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Нажми на эту иконку в адресной строке:
                    <FireFoxA2HSIcon />
                  </span>
                </li>
                <li>Затем нажми '+Добавить на главный экран'</li>
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
              <Typography variant="subtitle1">Для установки этого приложения:</Typography>
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Нажми на кнопку меню:
                    <OperaMenuIcon />
                  </span>
                </li>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Затем нажми &nbsp;'
                    <OperaA2HSIcon />
                    Главный экран'
                  </span>
                </li>
              </ul>
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.OTHER && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>К сожеланию, установка не поддерживается в вашем браузере. Открой это приложение в браузере Google Chrome</Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onClose}>Ok</Button>
            </Box>
          </Box>
        )}
      </DialogActions>
    </>
  );
}
