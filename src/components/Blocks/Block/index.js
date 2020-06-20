import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './index.scss';

import {
  BLOCK_PREVIEW,
  BLOCK_TEXT,
  BLOCK_PICTURE
} from 'constants/blockTypes';

const Block = ({
  image,
  type,
  text,
  link,
  onClick,
  className,
  animation,
  technical,
  scrollPosition
}) => {
  const isVideo = link && link.indexOf("youtube.com/embed") >= 0;

  const [showBlock, setShowBlock] = useState(!isVideo || type !== BLOCK_PICTURE);

  const video = (!isVideo ? null :
    <div className={classnames([
        'block',
        'block__video',
        { hidden: showBlock }
      ])}>
      <iframe src={link} title="siteFrame" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" rel="0" allowFullScreen></iframe>
    </div>);

  if (!showBlock) {
    return video;
  }

  const clickHandle = () => {
    if (isVideo) {
      setShowBlock(false);
    }
    else
    {
      window.open(link, "_blank");
    }
  };

  var block = null;
  switch (type) {
    case BLOCK_PICTURE: {
      block = (
        <div
          className={classnames([
            'block',
            'block__picture',
            { 'block__picture__with-image': image },
            { 'block__picture__with-button': link },
            { 'block__picture__with-image__with-button': image && link },
            className,
            { hidden: !showBlock }
          ])}
          onClick={onClick}
        >
          {image && (
            <LazyLoadImage src={image} alt={text} scrollPosition={scrollPosition} />
          )}
          {text && (
            <div className="block__title">{text}</div>
          )}
        </div>
      );

      break;
    }

    case BLOCK_TEXT: {
      const style = {};
      if (image)
        style.backgroundImage = `URL(${image})`;

      block = (
        <div className="box-block-text">
          <div
            className={classnames([
              'block',
              'block__text',
              { 'block__text__with-image': image },
              { 'block__text__with-button': link },
              { 'block__text__with-image__with-button': image && link },
              
              className
            ])}
            style={style}
            onClick={onClick}
          >
            {text && image && (
              <div className="block-text-with-text"/>
            )}

            <div className="block__title">{text}</div>
          </div>
        </div>
      );

      break;
    }

    case BLOCK_PREVIEW:
    default: {
      block = (
        <div
          className={classnames([
            'block',
            'block__preview',
            { 'block__preview__with-image': image },
            { 'block__preview__with-button': link },
            { 'block__preview__with-image__with-button': image && link },
            className,
            { hidden: !showBlock }
          ])}
          onClick={onClick}
        >
          {image && (
            <p className="block__title"><LazyLoadImage src={image} alt={text} scrollPosition={scrollPosition} />{text}</p>
            )}
           {!image && (
            <div className="block-preview-without-image-with-button">{text}</div>
          )}  
        </div>
      );
    }
  }

  if (link) {
    block = (<Button 
      className={classnames([
        'button-in-block',
        { hidden: !showBlock }
      ])}
      isPulse={animation} onClick={clickHandle} technical={technical}>
      {block}
      </Button>);
  }

  if (isVideo) {
    return (
      <React.Fragment>
        {!showBlock && video}
        {block}
      </React.Fragment>);
  }
  else {
    return block;
  }
};

Block.propTypes = {
  image: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  animation: PropTypes.bool,
  technical: PropTypes.bool
};

Block.defaultProps = {
  image: undefined,
  type: undefined,
  text: '',
  link: undefined,
  animation: false,
  technical: false
};

export default Block;
