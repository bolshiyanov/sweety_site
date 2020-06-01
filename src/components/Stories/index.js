import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { useSelector } from 'react-redux';
import { trackWindowScroll } from 'react-lazy-load-image-component';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';

import { EDIT_STORY, REMOVE_STORY, ROTATE_STORY } from 'constants/actions';

import StorySettings from './StorySettings';
import Story from './Story';

import './index.scss';
  
const emptySettings = {
  guid: null,
  type: 'preview-text',
  linkUrl: '',
  description: '',
  image: '',
};

const Stories = ({ data, scrollPosition }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [storyData, setStoryData] = useState(emptySettings);

  const closeStoriesSettings = () => {
    setSettingsOpened(null);
  };

  const onOpenStorySettings = (storyId) => {
    setSettingsOpened(storyId);
  };

  const { stories } = useSelector((state) => state.config.data);

  useEffect(() => {
    const currentStory = stories.find((story) => story.guid === settingsOpened);
    const settings = currentStory || { ...emptySettings };
    if (!settings.guid)
      settings.guid = uuid();
    setStoryData({ ...settings });
  }, [settingsOpened, stories]);

 
  return (
    <React.Fragment>
       <div className="stories">
          <div className="stories-picker">
            {data.map((story) => 
            <Story className={classnames(['stories-picker-item'])}  
              onClick={() => onOpenStorySettings(story.guid)} 
              key={story.guid} {...story} 
              scrollPosition={scrollPosition} />)}
          </div>
        </div> 
      <Slider
        opened={settingsOpened}
        onClose={closeStoriesSettings}
        onSubmit={closeStoriesSettings}
      >
        <StorySettings {...storyData} />
      </Slider>
      
    </React.Fragment>
  );
};

Stories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

Stories.defaultProps = {
  data: []
};

export default trackWindowScroll(Stories);
