import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/common/Button';
import './index.scss';

const HeaderTheme6 = ({ noConfig, avatar: propsAvatar, name: propsName, className }) => {
  const [configOpened, setConfigOpened] = useState(false);
  const {
    data: {
      name: userName,
      settings: {
      }
    }
  } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  return (
    <React.Fragment>

      <Button onClick={() => { }} className="user-name-theme6" >{userName || "Название бренда"} </Button>

    </React.Fragment>
  );
};

HeaderTheme6.propTypes = {
  noConfig: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string
};

HeaderTheme6.defaultProps = {
  noConfig: false,
  avatar: undefined,
  name: undefined,
  className: undefined
};

export default HeaderTheme6;
