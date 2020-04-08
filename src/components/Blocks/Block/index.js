import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';

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
  technical
}) => {
  if (link.indexOf("youtube.com/embed") >= 0) {
    return (
      <div className={classnames([
          'block',
          'block__video'
        ])}>
        <iframe src={link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
      </div>);
  }

  switch (type) {
    case BLOCK_PICTURE: {
      const block = (
        <div
          className={classnames([
            'block',
            'block__picture',
            { 'block__picture__with-image': image },
            { 'block__picture__with-button': link },
            { 'block__picture__with-image__with-button': image && link },
            className
          ])}
          onClick={onClick}
        >
          {image && (
            <img src={image} alt={text} />
          )}
          {text && (
            <div className="block__title">{text}</div>
          )}
        </div>
      );

      if (link)
        return <Button className="button-in-block" isPulse={animation} onClick={() => window.open(link, "_blank")} technical={technical}>{block}</Button>;
      return block;
    }

    case BLOCK_TEXT: {
      const style = {};
      if (image)
        style.backgroundImage = `URL(${image})`;

      const block = (
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
          <div className="block__title">{text}</div>
        </div>
      );

      if (link)
        return <Button className="button-in-block" isPulse={animation} onClick={() => window.open(link, "_blank")} technical={technical}>{block}</Button>;
      return block;
    }

    case BLOCK_PREVIEW:
    default: {
      const block = (
        <div
          className={classnames([
            'block',
            'block__preview',
            { 'block__preview__with-image': image },
            { 'block__preview__with-button': link },
            { 'block__preview__with-image__with-button': image && link },
            className
          ])}
          onClick={onClick}
        >
          {image && (
            <img src={image} alt={text} />
          )}
          <div className="block__title">{text}</div>
        </div>
      );

      if (link)
        return <Button className="button-in-block" isPulse={animation} onClick={() => window.open(link, "_blank")} technical={technical}>{block}</Button>;
      return block;
    }
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
