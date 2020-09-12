import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UPDATE_CONFIG_DATA } from 'constants/actions';

import './index.scss';

const TitleTheme7 = () => {
  const [data, setData] = useState({
    title: '', description: '',
    googleAnalytics: '', constructor: '',
  });
  const [settingsOpened, setSettingsOpened] = useState(false);

  const { title, description, googleAnalytics, seoSettings, constructor } = useSelector((state) => state.config.data);

  useEffect(() => {
    setData({ title, description, googleAnalytics, constructor, seoSettings });
  }, [title, description, googleAnalytics, constructor, seoSettings]);

  const onChangeData = useCallback((newTitle, newDescription,
    newGoogleAnalytics, newConstructor, newSeoSettings) => {
    setData({
      title: newTitle, description: newDescription,
      googleAnalytics: newGoogleAnalytics, constructor: newConstructor, seoSettings: newSeoSettings
    });
  }, [setData]); 

  const closeTitleSettings = useCallback(() => setSettingsOpened(false), [setSettingsOpened]);
  const dispatch = useDispatch();
  const submitSettings = () => {
    dispatch({
      type: UPDATE_CONFIG_DATA, title: data.title, description: data.description,
      googleAnalytics: data.googleAnalytics, constructor: data.constructor,
      seoSettings: data.seoSettings
    });
    closeTitleSettings();
  };

  return (
    <React.Fragment>
      {data.title && (
      <div className="title-theme7-box">
        <div className="title-theme7-button" >
          <h1 className="title-theme7" >{data.title}</h1>
          <div className="description-theme7" >{data.description}</div>
        </div>
      </div>
       )}
    
    </React.Fragment>
  );
};

export default TitleTheme7;
