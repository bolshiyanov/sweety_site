import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import InstagramFeed from 'components/InstagramFeed';
import YouTubeFeed from 'components/YouTubeFeed';

import './index.scss';

const Rss = () => {
  const [data, setData] = useState([]);

  const { rss } = useSelector((state) => state.config.data);

  const filteredRss = data.filter((item) => item.value !== '');

  useEffect(() => {
    setData(rss);
  }, [rss]);

  return (
    <React.Fragment>
      <div className="rss">
        {
          filteredRss.map((item) => (
            item.icon === 'instagram' ? <InstagramFeed key={item.value} account={item.value} {...item} /> : 
            item.icon === 'youtube' ? <YouTubeFeed key={item.value} account={item.value} {...item} /> :
            null
          ))
        }
      </div>
    </React.Fragment>
  );
};

export default Rss;
