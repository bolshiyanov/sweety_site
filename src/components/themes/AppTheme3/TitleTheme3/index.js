import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';

import { UPDATE_CONFIG_DATA } from 'constants/actions';

import './index.scss';

const TitleTheme3 = () => {
    const [data, setData] = useState({ title: '', description: '' });
  
    const { title, description } = useSelector((state) => state.config.data);
  
    
    useEffect(() => {
      setData({ title, description });
    }, [title, description]);

  return (
    <React.Fragment>
      <Button className="title-theme3-button" onClick={() => {}}>
          <h1 className="title-theme3" >{title || 'Маникюр с доставкой на дом'}</h1>
          <div className="description-theme3" >{description || 
          'Красота с доставкой на дом. У нас нет отдельной платы за выезд мастера и самый большой перечень услуг.'}</div>
      </Button>
      
    </React.Fragment> 
  );
};

export default TitleTheme3;
