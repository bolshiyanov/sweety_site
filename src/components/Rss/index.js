import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

const InstagramFeed = React.lazy(() => import('components/InstagramFeed'));
const YouTubeFeed = React.lazy(() => import('components/YouTubeFeed'));

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
        <Suspense fallback={<div>Загрузка...</div>}>
          {
            filteredRss.map((item) => (
              item.icon == 'instagram' ? (<InstagramFeed key={`${item.title}-${item.value}`} account={item.value} isPicker={instagramHasPicker} {...item} />) :
              item.icon == 'youtube' ? (<YouTubeFeed key={`${item.title}-${item.value}`} account={item.value} {...item} />) :
              null
            ))
          }
        </Suspense>  
      </div>
    </React.Fragment>
  );
};

export default Rss;
