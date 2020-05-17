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

  const getPreviewStyles = (image) => ({
    backgroundImage: `URL(${image})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  });
    
  var items = youTubeFeed?.items?.map((item) => ({
    id: item.code,
    component: (
      <div
        onClick={() => { window.open(item.url, "_blank"); }}
        style={getPreviewStyles(item.thumbnailUrl)}
      />)
  }));

  return (
    <div className="youtube-block">
      <div><Icon type="youtube" />{youTubeFeed?.feed?.title}</div>
      <Picker
        items={items}
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
