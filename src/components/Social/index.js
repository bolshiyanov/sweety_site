import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import './index.scss';

const Social = () => {
  const [data, setData] = useState([]);

  const { social } = useSelector((state) => state.config.data);

  const filteredSocial = data.filter((item) => item.value !== '');

  useEffect(() => {
    setData(social);
  }, [social]);

  return (
    <React.Fragment>
      <div className="social">
        {
          filteredSocial.map((item) => (
            <Button
              key={item.title}
              className="social__item"
              onClick={() => window.open(item.value, "_blank")}
            >
              <Icon type={item.icon} />
            </Button>
          ))
        }
      </div>
    </React.Fragment>
  );
};

export default Social;
