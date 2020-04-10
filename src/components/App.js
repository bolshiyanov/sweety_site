import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import Loading from 'components/common/Loading';

import Header from 'components/Header';
import Notification from 'components/Notification';
import Messengers from 'components/Messengers';
import Blocks from 'components/Blocks';
import Social from 'components/Social';
import Footer from 'components/Footer';
import Title from 'components/Title';
import Admin from 'components/Admin';

import API from 'utils/api';
import { getAdminSite } from 'utils/api';
import GoogleAnalytics from 'utils/googleAnalytics';

import { CONFIG_LOAD } from 'constants/actions';

const App = () => {
  const dispatch = useDispatch();

  const { profile } = useParams();

  useEffect(() => {
    API.updateProfile(profile);

    dispatch({ type: CONFIG_LOAD });
  }, []); // eslint-disable-line

  const { data = {} } = useSelector((state) => state.config);
  const { currentTheme } = useSelector((state) => state.config);

  if (!data)
    return <Loading />;

  const { settings = {} } = data;

  const backgroundStyles = currentTheme.getBackgroundStyles();
  return (
    <div className="app" style={backgroundStyles}>
      { GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker /> }
      <div className="app-container">
        <Header
          userName={data.name}
          avatar={data.avatar}
          profile={profile}
        />
        <Notification
          link={data.url}
          message={settings.advanced}
          url={settings.advancedLink}
          buttonTitle={settings.advancedTitle}
          profile={profile}
        />
        <Title />
        <Messengers />
        <Blocks data={data.blocks} />
        <Social />
        <Footer />
      </div>
    </div>
  );
};

const Router = () => (
  <Switch>
    <Route path="/:profile/admin" component={Admin} />
    <Route path="/:profile" component={App} />
    <Route component={() => { window.location.href = getAdminSite(); return null; }} />
  </Switch>
);

export default Router;