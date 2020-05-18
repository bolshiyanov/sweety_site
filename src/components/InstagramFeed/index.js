import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import Picker from 'components/common/Picker';

import API from 'utils/api';

import { SET_INSTAGRAM_FEED } from 'constants/actions';
import './index.scss';

const InstagramFeed = ({ account, title, isPicker }) => {
  const dispatch = useDispatch();

  const { instagramFeeds } = useSelector((state) => state.config);
  const instagramFeed = instagramFeeds ? instagramFeeds[title] : null;

  useEffect(() => {
    if (account) {
      API.getInstagramFeed(account.indexOf('instagram.com') > -1 ? account :
          `https://www.instagram.com/${account}/`)
        .then((data) => {
          if ((data?.items?.length ?? 0) > 0) {
            dispatch({ type: SET_INSTAGRAM_FEED, title, data }); 
          }
        });
    }
  }, []);

  if (!instagramFeed)
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
    {!isPicker && instagramFeed?.items && (
    <div className="instagram-feed-box">
      <div className="instagram-feed">
        {
          instagramFeed.items.splice(0, 4).map((image) => (
            <Button key={image.url} className="instagram-feed__button" onClick={() => { window.open(image.url, "_blank"); return null;}}>
              <img src={image.thumbnailUrl} className="instagram-feed__photo" alt="" />
            </Button>
          ))
        }
      </div>
    </div>)}
  </React.Fragment>);
};

InstagramFeed.propTypes = {
  account: PropTypes.string,
  title: PropTypes.string,
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
