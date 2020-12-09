import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { useCookies } from 'react-cookie';

import Slider from 'components/common/Slider';

import StorySettings from 'components/Stories/StorySettings';
import Story from 'components/themes/AppTheme3/StoryTheme3';

import { scrollTo } from 'utils/scrolling';
import { SCROLL_CATALOG_ID } from 'constants/scrolls';
import { CATALOG_FILTER } from 'constants/actions';

import './index.scss';

const emptySettings = {
    guid: null,
    type: 'preview-text',
    linkUrl: '',
    description: '',
    image: '',
};

const StoriesTheme3 = ({ data, profile, scrollPosition }) => {
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
    const { currentTheme } = useSelector((state) => state.config);
    const theme = currentTheme.name;
    const dispatch = useDispatch();

    const handleStoryClick = (storyId) => {
        if (catalogItems.filter(e => e.storyGuid === storyId).length > 0) {
            scrollTo(SCROLL_CATALOG_ID, () => {
                dispatch({ type: CATALOG_FILTER, storyGuid: storyGuid !== storyId ? storyId : null });
            });
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

    stories.sort((a, b) => b.order - a.order);
    return (
        <React.Fragment>
            <div className="stories-theme3-box">

                <div className="stories-theme3">
                    

                    {data.length > 0 && (
                        <div className="stories-theme3__box-story">
                            <div className="stories-theme3__box">
                                {(theme === "theme3" || theme === "theme5" ? data.slice(0, 4) : data).map((story) =>
                                    <Story className='stories-theme3__box__item'
                                        onClick={() => handleStoryClick(story.guid)}
                                        key={story.guid} {...story}
                                        selected={storyGuid === story.guid}
                                        scrollPosition={scrollPosition} />)}
                            </div>
                        </div>
                    )}
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
StoriesTheme3.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

StoriesTheme3.defaultProps = {
    data: []
};

export default trackWindowScroll(StoriesTheme3);
