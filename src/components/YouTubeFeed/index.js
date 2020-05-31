import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Picker from 'components/common/Picker';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import API from 'utils/api';

import { SET_YOUTUBE_FEED } from 'constants/actions';
import './index.scss';

const YouTubeFeed = ({ account, title, onClick, scrollPosition }) => {
  const dispatch = useDispatch();

  const { youTubeFeeds } = useSelector((state) => state.config);
  const youTubeFeed = youTubeFeeds ? youTubeFeeds[title] : null;

  useEffect(() => {
    if (account) {
      API.getYouTubeFeed(account)
        .then((data) => {
            if ((data?.items?.length ?? 0) > 0) {
                dispatch({ type: SET_YOUTUBE_FEED, title, data });
            }
        });
    }
  }, []);

  if (!youTubeFeed)
    return null;

  const getPickerPreviewStyles = (image) => ({
    backgroundImage: `URL(${image})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  });
    
  var pickerItems = youTubeFeed?.items?.map((item) => ({
    id: item.code,
    component: (
      <LazyLoadComponent scrollPosition={scrollPosition} threshold={10}>
        <div
          onClick={() => { window.open(item.url, "_blank"); }}
          style={getPickerPreviewStyles(item.thumbnailUrl)}
        />
      </LazyLoadComponent>)
   }));

  const openFeedLink = () => { window.open(youTubeFeed?.feed?.link, "_blank") };

  return (
    <LazyLoadComponent scrollPosition={scrollPosition}>
    <div className="youtube-block">
      <div className='youtube-header-box'>
        <div className='logomargin' onClick={openFeedLink}> <Icon type="youtube" /></div> 
        <div className='namemargin' onClick={openFeedLink}>{youTubeFeed?.feed?.title}</div>
      </div>
      
      <Picker
        items={pickerItems}
        className="horizontal-picker"
        itemClassName="youtube-picker__item"
        />
    </div>
    </LazyLoadComponent>
  );
};

YouTubeFeed.propTypes = {
  account: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
};

YouTubeFeed.defaultProps = {
  account: '',
  onClick: null
};

export default memo(YouTubeFeed);
