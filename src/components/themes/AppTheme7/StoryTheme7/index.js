import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { select } from 'redux-saga/effects';
import Button from 'components/common/Button';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

import './index.scss';
import 'components/Stories/Story/index.scss';

const StoryTheme7 = ({
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
            <div className={classnames([!image ? "" : 'story-theme7-picture', className])}
                onClick={onClick}
            >
                <div className={`story-theme7-picture__box${selected ? "-selected" : ""}`} style={{ backgroundImage: `URL(${image})` }} >
                    <Button onClick={onClick} className={`story-theme7-picture-title${selected ? "-selected" : ""}`}>{title}</Button>
                </div>
            </div>

        </LazyLoadComponent>
    );
    return story;
}

StoryTheme7.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,

};

StoryTheme7.defaultProps = {
    title: '',
    image: undefined,

};

export default StoryTheme7;
