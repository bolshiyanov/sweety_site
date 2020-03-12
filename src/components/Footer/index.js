import React from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

const Footer = () => {
  const { title, url } = useSelector((state) => state.config.config.whiteLabel);
  const { currentTheme } = useSelector((state) => state.config);
  const fontStyles = currentTheme.getFontColorStyles();
  return (
    <footer>
      <a href={url} style={fontStyles}>{title}</a>
    </footer>
  );
};

export default Footer;
