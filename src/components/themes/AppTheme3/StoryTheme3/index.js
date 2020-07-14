import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';



const StoryTheme3 = ({
  title,
  onClick,
}) => { 
    const story = (
        <div className="story-box-theme3"
               onClick={onClick}
             >
               <div className="story-picture-title-theme3">{title}</div>
            </div >
    );
    return story;
  }
  StoryTheme3.propTypes = {
    title: PropTypes.string,
};
StoryTheme3.defaultProps = {
    title: '',
};

export default StoryTheme3;