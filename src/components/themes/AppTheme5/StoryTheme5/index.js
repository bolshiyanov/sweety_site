import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { select } from 'redux-saga/effects';
import Button from 'components/common/Button';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

import './index.scss';
import 'components/Stories/Story/index.scss';

const StoryTheme5 = ({
    title,
    image,
    onClick,
    className,
    selected,
    scrollPosition
}) => {
    const story = (
        <LazyLoadComponent scrollPosition={scrollPosition} threshold={10}>
            <div className={classnames([!image ? "" : 'story-theme5-picture', className])} 
                onClick={onClick}
            >
                <div className= 'story-theme5-picture__box' style={{ backgroundImage: `URL(${image})` }} />
                <Button onClick={onClick} className={`story-theme5-picture-title${selected ? "-selected" : ""}`}>{title}</Button>
            </div>
        </LazyLoadComponent>
    );
    return story;
}

StoryTheme5.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,

};

StoryTheme5.defaultProps = {
    title: '',
    image: undefined,

};

export default StoryTheme5;
