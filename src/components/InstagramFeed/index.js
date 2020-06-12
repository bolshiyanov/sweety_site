import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import Picker from 'components/common/Picker';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

import API from 'utils/api';

import { SET_INSTAGRAM_FEED } from 'constants/actions';
import './index.scss';

const InstagramFeed = ({ account, title, isPicker, scrollPosition }) => {
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

  if (!instagramFeed || (instagramFeed?.items?.length ?? 0) === 0)
    return null;

  const getPickerPreviewStyles = (image) => ({
    display: 'inline-block', 
    position: 'relative',
    width: '170px',
    height: '170px',
    backgroundImage: `URL(${image})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  });
  
  console.log(title + ": " + JSON.stringify(instagramFeed?.items));
  var pickerItems = instagramFeed?.items?.map((item) => ({
    id: item.code,
    component: (
      <LazyLoadComponent scrollPosition={scrollPosition} threshold={10}>
        <div
          onClick={() => { window.open(item.url, "_blank"); }}
          style={getPickerPreviewStyles(item.thumbnailUrl)}
        />
      </LazyLoadComponent>)
  }));
 
  const openFeedLink = () => { window.open(instagramFeed?.feed?.link, "_blank") };

  return (
    <LazyLoadComponent scrollPosition={scrollPosition}>
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
              <LazyLoadImage src={image.thumbnailUrl} scrollPosition={scrollPosition} />
            </Button>
          ))
        }
      </div>
    </div>)}
  </LazyLoadComponent>);
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
