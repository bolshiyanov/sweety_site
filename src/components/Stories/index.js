import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { useSelector } from 'react-redux';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { useCookies } from 'react-cookie';

import Slider from 'components/common/Slider';

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

const Stories = ({ data, profile, scrollPosition }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [storyData, setStoryData] = useState(emptySettings);
  const [cookies] = useCookies();

  const closeStoriesSettings = () => {
    setSettingsOpened(null);
  };

  const onOpenStorySettings = (storyId) => {
    setSettingsOpened(storyId);
  };

  const { active } = useSelector((state) => state.config.account);

  const { stories } = useSelector((state) => state.config.data);

  var inviteId = cookies[profile];
  if (inviteId === "undefined") {
    inviteId = null;
  }

  useEffect(() => {
    const currentStory = stories.find((story) => story.guid === settingsOpened);
    const settings = currentStory || { ...emptySettings };
    if (!settings.guid)
      settings.guid = uuid();
    setStoryData({ ...settings });
  }, [settingsOpened, stories]);

  if (inviteId && !active) {
    return null;
  }
 
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
