import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const Story = ({
  title,
  image,
  onClick,
className,
}) => { 
    const story = (
      <div className={classnames([{ 'story-picture': image }, className ])}
          onClick={onClick}
          > 
          {image && (
            <img src={image} alt={title} />
          )} 
          <div className="story-picture-title">{title}</div>
          
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
