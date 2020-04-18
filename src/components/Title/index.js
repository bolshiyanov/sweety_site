import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

const Title = () => {
  const [data, setData] = useState({ title: '', description: '' });

  const { title, description } = useSelector((state) => state.config.data);

  
  useEffect(() => {
    setData({ title, description });
  }, [title, description]);

  return (
    <React.Fragment>
      {Boolean(data.title) && (
        <h1 className="title">{data.title}</h1>
      )}
      {Boolean(data.description) && (
        <div className="description">{data.description}</div>
      )}
    </React.Fragment>
  );
};

export default Title;
