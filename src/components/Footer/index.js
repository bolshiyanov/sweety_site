import React from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

const Footer = () => {
  const { url } = useSelector((state) => state.config.config.whiteLabel);
  const { active } = useSelector((state) => state.config.account);
  const { currentTheme } = useSelector((state) => state.config);
  const fontStyles = currentTheme.getFontColorStyles();
  return (
    <footer>
      {!active && <a href={url} className="textfooter">Создай страницу как у меня бесплатно</a>}
      <br />
      <br />
      {!active && <a href={url} className="textlogofooter">SWEETY_2020</a>}
    </footer>
  );
};

export default Footer;
