import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';


import './index.scss';

const StorySettings = (props) => {
  

  const   {
    guid,
    title,
    image,
    image2,
    image3,
    image4,
    image5,
    description,
    video,
    actionTimeout,
    price,
    // currency,
    cta,
    linkUrl,
    termTitle,
    termText,
  } = props;

  return (
    <React.Fragment>
      <div className="story-settings__preview">
                <div className="story-settings__preview__title">{title}</div>
                <div className="stories-preview-slider-box">
                  <div className="preview-slider-box"> 
                      <div className='picters-item'><img src={image} alt={title} /></div>
                      <div className='picters-item'><img src={image2} alt={title} /></div>
                      <div className='picters-item'><img src={image3} alt={title} /></div>
                      <div className='picters-item'><img src={image4} alt={title} /></div>
                      <div className='picters-item'><img src={image5} alt={title} /></div>
                   </div>  
                <div className="story-settings__preview__description">{description}</div>  
                </div>
                <div className="video"><iframe width="560" height="315" src={video} 
                    frameborder="0" rel="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className="story-settings__preview__price">{price}</div>
                <Button name={title} className="story-settings__preview__button" onClick={() => window.open(linkUrl, "_blank")}>{cta}</Button>
                <div className="story-settings__preview__actionTimeout">{actionTimeout}</div>
                <div className="story-settings__preview__termtitle">{termTitle}</div>
                <div className="story-settings__preview__termtext">{termText}</div>
      </div>
      </React.Fragment>
  );
};

StorySettings.propTypes = {
        title: PropTypes.string,
        image: PropTypes.string,
        image2: PropTypes.string,
        image3: PropTypes.string,
        image4: PropTypes.string,
        image5: PropTypes.string,
        description: PropTypes.string,
        video: PropTypes.string,
        actionTimeout: PropTypes.string,
        price: PropTypes.string,
        currency: PropTypes.string,
        cta: PropTypes.string,
        linkUrl: PropTypes.string,
        termTitle: PropTypes.string,
        termText: PropTypes.string,
        
};

StorySettings.defaultProps = {
        title: '',
        image: '',
        image2:'',
        image3:'',
        image4:'',
        image5:'',
        description: '',
        video: '',
        actionTimeout: '',
        price: '',
        currency: '',
        cta: '',
        linkUrl: '',
        termTitle: '',
        termText: '',
        onChange: () => {},
};

export default StorySettings;

