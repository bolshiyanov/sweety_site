import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { select } from 'redux-saga/effects';
import Button from 'components/common/Button';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

import './index.scss';
import 'components/Stories/Story/index.scss';

const StoryTheme6 = ({
    title,
    image,
    description,
    onClick,
    className,
    scrollPosition
}) => {

    if (description) {
        return null;
        };

    const story = (
        <LazyLoadComponent scrollPosition={scrollPosition} threshold={10}>
            <div className={classnames([!image ? "" : 'story-theme6-picture', className])}
                onClick={onClick}
            >
                <div className={'story-theme6-picture__box'} style={{ backgroundImage: `URL(${image})` }} />
    <div onClick={onClick} className={'story-theme6-picture-title'}>{title}</div>
            </div>
        </LazyLoadComponent> 
    );
    return story;
}

StoryTheme6.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,

};

StoryTheme6.defaultProps = {
    title: '',
    image: undefined,

};

export default StoryTheme6;