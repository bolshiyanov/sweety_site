import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { select } from 'redux-saga/effects';
import Button from 'components/common/Button';

import './index.scss';



const StoryTheme2 = ({
    title,
    image,
    onClick,
    className,
    selected,
}) => {
    const story = (
        <React.Fragment>
            {!selected && (
        <div className={classnames([{ 'story-theme2-picture': image }, className])}
            onClick={onClick}
        >
            <div className="story-theme2-picture__box" style={{ backgroundImage: `URL(${image})` }} />
            <Button onClick={onClick} className="story-theme2-picture-title">{title} </Button>
        </div>
        )}
        {selected && (
        <div className={classnames([{ 'story-theme2-picture': image }, className])}
            onClick={onClick}
        >
            <div className="story-theme2-picture__box-selected" style={{ backgroundImage: `URL(${image})` }} />
            <Button onClick={onClick} className="story-theme2-picture-title-selected">{title}</Button>
        </div>
        )}
        </React.Fragment>
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
