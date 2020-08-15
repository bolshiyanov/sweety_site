import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

import './index.scss';
import { select } from 'redux-saga/effects';

const Story = ({
  title,
  image,
  onClick,
  className,
  selected,
  scrollPosition
}) => {
  const story = (
    <LazyLoadComponent scrollPosition={scrollPosition} threshold={10}>
      {!selected && (
        <div className={classnames([{ 'story-picture': image }, className])}
          onClick={onClick}>

          {image && (
            <LazyLoadImage src={image} alt={title} scrollPosition={scrollPosition} threshold={10} />
          )}
          <div className="story-picture-title">{title}</div>
        </div>
      )}

      {selected && (
        <div className={classnames([{ 'story-picture-selected': image }, className])}
          onClick={onClick}>

          {image && (
            <LazyLoadImage src={image} alt={title} scrollPosition={scrollPosition} threshold={10} />
          )}
          <div className="story-picture-title">{title}</div>
        </div>
      )}

    </LazyLoadComponent>
  );
  return story;
}





Story.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,

};

Story.defaultProps = {
  title: '',
  image: undefined,

};

export default Story;
