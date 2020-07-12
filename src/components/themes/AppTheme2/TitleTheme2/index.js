import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import { UPDATE_CONFIG_DATA } from 'constants/actions';
import './index.scss';

const TitleTheme2 = () => {
  const [data, setData] = useState({ title: '', description: '' });

  const { title, description } = useSelector((state) => state.config.data);

  
  useEffect(() => {
    setData({ title, description });
  }, [title, description]);

  return (
    <React.Fragment>
      <Button className="title-theme2-button">
          <h1 className="title-theme2" >{title || 'Тема 2'}</h1>
          <div className="description-theme2" >{description || 
          'Добавь описание для своего приложения. Расскажи о том, какую выгоду получает посетитель. Мотивируй его на установку твоего приложения'}</div>
      </Button>
      
    </React.Fragment> 
  );
};

export default TitleTheme2;
