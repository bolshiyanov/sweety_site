import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';

import image2_1 from 'images/ImageTheme2_1.jpg';
import image2_2 from 'images/ImageTheme2_2.jpg';
import image2_3 from 'images/ImageTheme2_3.jpg';
import image2_4 from 'images/ImageTheme2_4.jpg';
import image2_5 from 'images/ImageTheme2_5.jpg';

import { EDIT_STORY, REMOVE_STORY, ROTATE_STORY } from 'constants/actions';

import StorySettings from 'components/Stories/StorySettings';
import Story from 'components/themes/AppTheme2/StoryTheme2';

import './index.scss';

const emptySettings = {
  guid: null,
  type: 'preview-text',
  order: null,
  linkUrl: '',
  description: '',
  image: '',
};

const StoriesTheme2 = ({ data }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [storyData, setStoryData] = useState(emptySettings);

  const closeStoriesSettings = () => {
    setSettingsOpened(null);
  };

  const onOpenStorySettings = (storyId) => {
    setSettingsOpened(storyId);
  };

  const dispatch = useDispatch();
  const submitSettings = () => {
    if (storyData.description || storyData.image)
      dispatch({ type: EDIT_STORY, payload: storyData });
    closeStoriesSettings();
  };

  const removeSettings = () => {
    dispatch({ type: REMOVE_STORY, guid: storyData.guid });
    closeStoriesSettings();
  };

  const { stories } = useSelector((state) => state.config.data);
  const { active, paymentData } = useSelector((state) => state.config.account);

  useEffect(() => {
    const currentStory = stories.find((story) => story.guid === settingsOpened);
    const settings = currentStory || { ...emptySettings };
    if (!settings.guid)
      settings.guid = uuid();
    setStoryData({ ...settings });
  }, [settingsOpened, stories]);

  const onRotate = (guid, order) => {
    dispatch({ type: ROTATE_STORY, guid, order });
  };


  stories.sort((a, b) => b.order - a.order);
  return (
    <React.Fragment>
      <div className="stories-theme2">
        <div className="stories-theme2-picker">

          {!data.length > 0 && (
            <div className="stories-theme2-picker__empty">
              <div className="stories-theme2-picker-item">
                <div className="stories-theme2-picker-item-flexbox">
                  <div className="stories-theme2-picker-item-flexbox__box" style={{ backgroundImage: `URL(${image2_1})` }} />
                  <Button className="stories-theme2-picker-item-flexbox__title">Какой у тебя опыт или стаж</Button>
                </div>
              </div>
              <div className="stories-theme2-picker-item">
                <div className="stories-theme2-picker-item-flexbox">
                  <div className="stories-theme2-picker-item-flexbox__box" style={{ backgroundImage: `URL(${image2_2})` }} />
                  <Button className="stories-theme2-picker-item-flexbox__title">Расскажи о своих продуктах</Button>
                </div>
              </div>
              <div className="stories-theme2-picker-item">
                <div className="stories-theme2-picker-item-flexbox">
                  <div className="stories-theme2-picker-item-flexbox__box" style={{ backgroundImage: `URL(${image2_3})` }} />
                  <Button className="stories-theme2-picker-item-flexbox__title">Расскажи о себе</Button>
                </div>
              </div>
              <div className="stories-theme2-picker-item">
                <div className="stories-theme2-picker-item-flexbox">
                  <div className="stories-theme2-picker-item-flexbox__box" style={{ backgroundImage: `URL(${image2_4})` }} />
                  <Button className="stories-theme2-picker-item-flexbox__title">Размести отзывы</Button>
                </div>
              </div>
              <div className="stories-theme2-picker-item">
                <div className="stories-theme2-picker-item-flexbox">
                  <div className="stories-theme2-picker-item-flexbox__box" style={{ backgroundImage: `URL(${image2_5})` }} />
                  <Button className="stories-theme2-picker-item-flexbox__title">Твое исключительное преимущество</Button>
                </div>
              </div>

            </div>
          )}

          {data.map((story) =>
            <Story className={classnames(['stories-theme2-picker-item'])}
              onClick={() => onOpenStorySettings(story.guid)}
              key={story.guid} {...story} />)}
        </div>
      </div>
      <Slider
        opened={settingsOpened !== null}
        onClose={closeStoriesSettings}
        onSubmit={submitSettings}
      >
        <StorySettings {...storyData} onRotate={onRotate} onChange={(settings) => setStoryData({ ...storyData, ...settings })} />
      </Slider>

    </React.Fragment>
  );
};

StoriesTheme2.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

StoriesTheme2.defaultProps = {
  data: []
};

export default StoriesTheme2; 
