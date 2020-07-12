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
import StoryTheme1 from 'components/themes/AppTheme1/StoryTheme1';

import './index.scss';

const emptySettings = {
    guid: null,
    type: 'preview-text',
    order: null,
    linkUrl: '',
    description: '',
    image: '',
};

const StoriesTheme1 = ({ data }) => {
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
            <div className="stories-theme1">
                {data.length === 0 && (
                    <div className="stories-theme1__box">
                        <div className="stories-theme1__box__didlimiter"></div>
                        <ButtonTheme1 className="story-picture-title-theme1"
                            key="add-button"
                            onClick={onOpenStorySettings}
                        >
                            Обо мне
                        </ButtonTheme1>
                        <ButtonTheme1 className="story-picture-title-theme1"
                            key="add-button"
                            onClick={onOpenStorySettings}
                        >
                            История
                        </ButtonTheme1>
                        <ButtonTheme1 className="story-picture-title-theme1"
                            key="add-button"
                            onClick={onOpenStorySettings}
                        >
                            Услуги
                        </ButtonTheme1>
                        <ButtonTheme1 className="story-picture-title-theme1"
                            key="add-button"
                            onClick={onOpenStorySettings}
                        >
                            Выгода
                        </ButtonTheme1>
                        <ButtonTheme1 className="story-picture-title-theme1"
                            key="add-button"
                            onClick={onOpenStorySettings}
                        >
                            Отзывы
                        </ButtonTheme1>
                        <div className="stories-theme1__box__didlimiter"></div>
                    </div>
                )}
                <div className="stories-theme1__box">
                    {(theme === "theme1" ? data.slice(0, 5) : data).map((story) =>
                        <StoryTheme1 className='stories-theme1__box__item'
                            onClick={() => onOpenStorySettings(story.guid)}
                            key={story.guid} {...story} />)}
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

export default StoriesTheme1;
