import React from "react";
import { DialogActions, Typography, Button, Box } from "@material-ui/core";
import { platforms } from "./platforms";
import { IOSShareIcon, FireFoxA2HSIcon, OperaMenuIcon, OperaA2HSIcon } from "./icons";

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
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Нажмите на кнопку поделиться:
                    <IOSShareIcon />
                  </span>
                </li>
                <li>затем найдите и нажмите на кнопку 'Добавить на главный экран'</li>
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
                    Нажмите на эту иконку в адресной строке:
                    <FireFoxA2HSIcon />
                  </span>
                </li>
                <li>затем нажмите '+Добавить на главный экран'</li>
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
                    Нажмите на кнопку меню:
                    <OperaMenuIcon />
                  </span>
                </li>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    затем нажмите &nbsp;'
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
            <Box>К сожеланию, установка не поддерживается в вашем браузере.</Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onClose}>Ok</Button>
            </Box>
          </Box>
        )}
      </DialogActions>
    </>
  );
}