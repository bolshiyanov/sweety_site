import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/common/Button';
import './index.scss';

const TitleTheme2 = () => {
  const [data, setData] = useState({ title: '', description: '' });

  const { title, description } = useSelector((state) => state.config.data);

  
  useEffect(() => {
    setData({ title, description });
  }, [title, description]);

  return (
    <React.Fragment>
      <Button className="title-theme2-button" onClick={() => {}}>
          <h1 className="title-theme2" >{title || 'Модный дизайнер'}</h1>
          <div className="description-theme2" >{description || 
          'Вечный, но современный, классический и провокационный- приветствую вас на моем официальном сайте. Откройте для себя подборку основных дизайнов, с помощью которых ваша внешность выйдет на новый уровень.'}</div>
      </Button>
      
    </React.Fragment> 
  );
};

export default TitleTheme2;
