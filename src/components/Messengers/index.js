import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import './index.scss';

const Messengers = () => {
  const [data, setData] = useState([]);

  const { messengers } = useSelector((state) => state.config.data);

  useEffect(() => {
    setData(messengers);
  }, [messengers]);

  const filteredMessengers = data.filter((messenger) => messenger.value !== '');

  return (
    <React.Fragment>
      <div className="messengers">
        {
          filteredMessengers.map((messenger) => (
            <Button
              key={messenger.title}
              className="messenger"
              onClick={() => window.open(messenger.value, "_blank")}
            >
              <Icon type={messenger.icon} />
            </Button>
          ))
        }
      </div>
    </React.Fragment>
  );
};

export default Messengers;
