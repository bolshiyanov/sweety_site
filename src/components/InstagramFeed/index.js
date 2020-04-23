import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/common/Button';

import API from 'utils/api';

import { SET_INSTAGRAM_FEED } from 'constants/actions';
import './index.scss';

const InstagramFeed = ({ account }) => {
  const dispatch = useDispatch();

  const { instagramFeed } = useSelector((state) => state.config);

  useEffect(() => {
    if (account) {
      API.getInstagramFeed(account)
        .then((data) => {
          dispatch({ type: SET_INSTAGRAM_FEED, data });
        });
    }
  }, []);

  if (!account)
    return null;

  return (
    <div className="instagram-feed-box">
     <div className="instagram-feed">
      {
        instagramFeed?.map((image) => (
          <Button className="instagram-feed__button" onClick={() => { window.open(image.url, "_blank"); return null;}}>
            <img src={image.thumbnailUrl} key={image.url} className="instagram-feed__photo" alt="" />
          </Button>
        ))
      }
     </div>
    </div>
  );
};

InstagramFeed.propTypes = {
  account: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func
};

InstagramFeed.defaultProps = {
  account: '',
  link: '',
  onClick: null
};

export default memo(InstagramFeed);
