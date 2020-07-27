import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { useSelector, useDispatch } from 'react-redux';

import ButtonTheme1 from 'components/themes/AppTheme1/ButtonTheme1';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';

import { EDIT_STORY, REMOVE_STORY, ROTATE_STORY } from 'constants/actions';

import StorySettings from 'components/Stories/StorySettings';
import StoryTheme3 from 'components/themes/AppTheme3/StoryTheme3';

import './index.scss';

const emptySettings = {
    guid: null,
    type: 'preview-text',
    order: null,
    linkUrl: '',
    description: '',
    image: '',
};

const StoriesTheme3 = ({ data }) => {
    const [settingsOpened, setSettingsOpened] = useState(null);
    const [storyData, setStoryData] = useState(emptySettings);
    
    const { currentTheme } = useSelector((state) => state.config);
    const theme = currentTheme.name;
    
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
            <div className="stories-theme3-box">
           
                <div className="stories-theme3">
                    {data.length === 0 && (
                        <div className="stories-theme3__box">
                            <div className="stories-theme3__box__didlimiter"></div>
                            <div className="story-picture-title-theme3"
                                key="add-button"
                                onClick={onOpenStorySettings}
                            >
                                Меню1
                        </div>
                            <div className="story-picture-title-theme3"
                                key="add-button"
                                onClick={onOpenStorySettings}
                            >
                                Меню2
                        </div>
                            <div className="story-picture-title-theme3"
                                key="add-button"
                                onClick={onOpenStorySettings}
                            >
                                Меню3
                        </div>
                            <div className="story-picture-title-theme3"
                                key="add-button"
                                onClick={onOpenStorySettings}
                            >
                                Меню4
                        </div>
                            <div className="stories-theme3__box__didlimiter"></div>
                        </div>
                    )}

                    {data.length > 0 && (
                        <div className="stories-theme3__box-story">
                            <div className="stories-theme3__box">
                            {(theme === "theme3" ? data.slice(0, 4) : data).map((story) =>
                                    <StoryTheme3 className='stories-theme3__box__item'
                                        onClick={() => onOpenStorySettings(story.guid)}
                                        key={story.guid} {...story} />)}
                            </div>
                        </div>
                    )}
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
StoriesTheme3.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({}))
  };
  
  StoriesTheme3.defaultProps = {
    data: []
  };
export default StoriesTheme3;
