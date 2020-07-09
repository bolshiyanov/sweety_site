import React from 'react';
import PropTypes from 'prop-types';

import ButtonTheme1 from 'components/themes/AppTheme1/ButtonTheme1';

import './index.scss';



const StoryTheme1 = ({
  title,
  onClick,
}) => { 
    const story = (
        <ButtonTheme1
               key="story"
               onClick={onClick}
             >
               <div className="story-picture-title-theme1">{title}</div>
            </ButtonTheme1>
    );
    return story;
  }
  StoryTheme1.propTypes = {
    title: PropTypes.string,
};
StoryTheme1.defaultProps = {
    title: '',
};

export default StoryTheme1;