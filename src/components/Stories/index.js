import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { useCookies } from 'react-cookie';

import Slider from 'components/common/Slider';

import StorySettings from './StorySettings';
import Story from './Story';

import { CATALOG_FILTER } from 'constants/actions';

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

  const { active } = useSelector((state) => state.config.account);

  const { stories } = useSelector((state) => state.config.data);
  const { catalogItems } = useSelector((state) => state.config.data);
  const { storyGuid } = useSelector((state) => state.config);

  const dispatch = useDispatch();

  const handleStoryClick = (storyId) => {
    if (catalogItems.filter(e => e.storyGuid === storyId).length > 0) {
      dispatch({ type: CATALOG_FILTER, storyGuid: storyGuid !== storyId ? storyId : null });
    } else {
      setSettingsOpened(storyId);
    }
  }

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

  // if (!inviteId && !active) {
  //   return null;
  // }
 
  stories.sort((a, b) => b.order - a.order);
  return (
    <React.Fragment>
       <div className="stories">
          <div className="stories-picker">
            {data.map((story) => 
            <Story className={classnames(['stories-picker-item'])}  
              onClick={() => handleStoryClick(story.guid)} 
              key={story.guid} {...story} 
              selected={storyGuid === story.guid}
              scrollPosition={scrollPosition} />)}
          </div>
        </div> 
      <Slider
        opened={settingsOpened}
        onClose={closeStoriesSettings}
        onSubmit={closeStoriesSettings}
        submitTitle={"ЗАКРЫТЬ"} 
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
