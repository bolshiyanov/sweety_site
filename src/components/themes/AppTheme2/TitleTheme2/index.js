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
          <h1 className="title-theme2" >{title || 'Заголвок приложения'}</h1>
          <div className="description-theme2" >{description || 
          'Описание приложения'}</div>
      </Button>
      
    </React.Fragment> 
  );
};

export default TitleTheme2;
