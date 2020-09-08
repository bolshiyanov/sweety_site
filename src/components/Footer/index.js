import React from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

const Footer = () => {
  const { url } = useSelector((state) => state.config.config.whiteLabel);
  const { active } = useSelector((state) => state.config.account);

  return (
    <footer>
      {active ? <br /> : <a href={url} target="_blank" className="textfooter">Создай приложение как у меня</a>}
      <div className="textlogofooter"></div>
    </footer>
  );
};

export default Footer;  
