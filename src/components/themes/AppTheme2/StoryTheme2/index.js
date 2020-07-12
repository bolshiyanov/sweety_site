import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';

import './index.scss';



const Story = ({
    title,
    image,
    onClick,
    className,
}) => {
    const story = (
        <div className={classnames([{ 'story-theme2-picture': image }, className])}
            onClick={onClick}
        >
            <div className="story-theme2-picture__box" style={{ backgroundImage: `URL(${image})` }} />
            <Button className="story-theme2-picture-title">{title} </Button>

        </div>


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
