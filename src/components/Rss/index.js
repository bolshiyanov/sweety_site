import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import InstagramFeed from 'components/InstagramFeed';
import YouTubeFeed from 'components/YouTubeFeed';

import './index.scss';

const Rss = () => {
  const [data, setData] = useState([]);

  const { rss } = useSelector((state) => state.config.data);
  const { instagramFeeds, youTubeFeeds } = useSelector((state) => state.config);

  const instagramRssCount = !instagramFeeds ? 0 : Object.keys(instagramFeeds).length;
  const youTubeRssCount = !youTubeFeeds ? 0 : Object.keys(youTubeFeeds).length;
  const instagramHasPicker = youTubeRssCount > 0 || instagramRssCount > 1;

  const filteredRss = data.filter((item) => item.value !== '');

  useEffect(() => {
    setData(rss);
  }, [rss]);

  return (
    <React.Fragment>
      <div className="rss">
        {
          filteredRss.map((item) => (
            item.icon == 'instagram' ? (<InstagramFeed key={`${item.title}-${item.value}`} account={item.value} isPicker={instagramHasPicker} {...item} />) :
            item.icon == 'youtube' ? (<YouTubeFeed key={`${item.title}-${item.value}`} account={item.value} {...item} />) :
            null
          ))
        }
      </div>
    </React.Fragment>
  );
};

export default Rss;
