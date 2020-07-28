import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';



const StoryTheme6 = ({
  title,
  image,
  onClick,
className,
}) => { 
    const story = (
      <div className={classnames([{ 'story-theme6-picture': image }, className ])}
          onClick={onClick}
          > 
          {image && (
            <img src={image} alt={title} />
          )} 
          
          
        </div>
      

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