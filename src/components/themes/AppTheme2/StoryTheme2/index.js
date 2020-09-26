import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { select } from 'redux-saga/effects';
import Button from 'components/common/Button';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

import './index.scss';
import 'components/Stories/Story/index.scss';

const StoryTheme2 = ({
    title,
    image,
    onClick,
    className,
    selected,
    isSticky,
    scrollPosition
}) => {
    const story = (
        <LazyLoadComponent scrollPosition={scrollPosition} threshold={10}>
        {!isSticky && (
            <div className={classnames([!image ? "" : 'story-theme2-picture', className])}
                onClick={onClick}
            >
                <div className={`story-theme2-picture__box${selected ? "-selected" : ""}`} style={{ backgroundImage: `URL(${image})` }} />
                <Button onClick={onClick} className={`story-theme2-picture-title${selected ? "-selected" : ""}`}>{title}</Button>
            </div>
        )}
        {isSticky && (
            <div className={classnames([`story-picture${selected ? "-selected" : ""}`, className])}
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

StoryTheme2.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,

};

StoryTheme2.defaultProps = {
    title: '',
    image: undefined,

};

export default StoryTheme2;
