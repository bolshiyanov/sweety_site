import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Picker from 'components/common/Picker';

import API from 'utils/api';

import { SET_YOUTUBE_FEED } from 'constants/actions';
import './index.scss';

const YouTubeFeed = ({ account, onClick }) => {
  const dispatch = useDispatch();

  const { youTubeFeed } = useSelector((state) => state.config);

  useEffect(() => {
    if (account) {
      API.getYouTubeFeed(account)
        .then((data) => {
          dispatch({ type: SET_YOUTUBE_FEED, data });
        });
    }
  }, []);

  if (!account)
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
      <div
        onClick={() => { window.open(item.url, "_blank"); }}
        style={getPickerPreviewStyles(item.thumbnailUrl)}
      />)
  }));

  const openFeedLink = () => { window.open(youTubeFeed?.feed?.link, "_blank") };

  return (
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
  );
};

YouTubeFeed.propTypes = {
  account: PropTypes.string,
  onClick: PropTypes.func
};

YouTubeFeed.defaultProps = {
  account: '',
  onClick: null
};

export default memo(YouTubeFeed);
