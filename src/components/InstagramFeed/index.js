import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import Picker from 'components/common/Picker';

import API from 'utils/api';

import { SET_INSTAGRAM_FEED } from 'constants/actions';
import './index.scss';

const InstagramFeed = ({ account, isPicker }) => {
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

  const getPickerPreviewStyles = (image) => ({
    backgroundImage: `URL(${image})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  });
    
  var pickerItems = instagramFeed?.items?.map((item) => ({
    id: item.code,
    component: (
      <div
        onClick={() => { window.open(item.url, "_blank"); }}
        style={getPickerPreviewStyles(item.thumbnailUrl)}
      />)
  }));

  const openFeedLink = () => { window.open(instagramFeed?.feed?.link, "_blank") };

  return (
  <React.Fragment>
    {isPicker && (
    <div className="instagram-block">
      <div className='instagram-header-box'>
        <div className='logomargin' onClick={openFeedLink}> <Icon type="instagram" /></div> 
        <div className='namemargin' onClick={openFeedLink}> {instagramFeed?.feed?.title}</div>
      </div>
      <Picker
        items={pickerItems}
        className="horizontal-picker"
        itemClassName="instagram-picker__item"
      />
    </div>)}
    {!isPicker && (
    <div className="instagram-feed-box">
      <div className="instagram-feed">
        {
          instagramFeed?.items?.map((image) => (
            <Button className="instagram-feed__button" onClick={() => { window.open(image.url, "_blank"); return null;}}>
              <img src={image.thumbnailUrl} key={image.url} className="instagram-feed__photo" alt="" />
            </Button>
          ))
        }
      </div>
    </div>)}
  </React.Fragment>);
};

InstagramFeed.propTypes = {
  account: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  isPicker: PropTypes.bool
};

InstagramFeed.defaultProps = {
  account: '',
  link: '',
  onClick: null,
  isPicker: false
};

export default memo(InstagramFeed);
