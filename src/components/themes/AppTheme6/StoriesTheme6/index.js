import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'components/common/Slider';

import { EDIT_STORY, REMOVE_STORY, ROTATE_STORY } from 'constants/actions';

import StorySettings from 'components/Stories/StorySettings';
import Story from 'components/themes/AppTheme6/StoryTheme6';

import 'components/Stories/index.scss';

const emptySettings = {
    guid: null,
    type: 'preview-text',
    order: null,
    linkUrl: '',
    description: '',
    image: '',
};

const StoriesTheme6 = ({ data }) => {
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
            <div className="stories">
                <div className="stories-picker">
                    {data.map((story) =>
                        <Story className={classnames(['stories-theme6-picker-item'])}
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

StoriesTheme6.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

StoriesTheme6.defaultProps = {
    data: []
};

export default StoriesTheme6;
