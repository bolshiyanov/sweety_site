import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';


import './index.scss';

const HeaderTheme3 = () => {
    const { name } = useSelector((state) => state.config.data);
  
  return (
    <React.Fragment>
      <Button className="user-name-theme3" onClick = {() => {}}>{ name || "Твой бренд"} </Button> 
    
    </React.Fragment>
  );
};

HeaderTheme3.propTypes = {
  noConfig: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string
};

HeaderTheme3.defaultProps = {
  noConfig: false,
  avatar: undefined,
  name: undefined,
  className: undefined
};

export default HeaderTheme3;
