import React, { useEffect, Suspense } from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import Loading from 'components/common/Loading';

import Admin from 'components/Admin';
import Landing from 'components/Landing';
import Start from 'components/Start';

import API from 'utils/api';
import GoogleAnalytics from 'utils/googleAnalytics';

import { CONFIG_LOAD } from 'constants/actions';

const Header = React.lazy(() => import('components/Header'));
const Notification = React.lazy(() => import('components/Notification'));
const Title = React.lazy(() => import('components/Title'));
const Messengers = React.lazy(() => import('components/Messengers'));
const Blocks = React.lazy(() => import('components/Blocks'));
const Rss = React.lazy(() => import('components/Rss'));
const Social = React.lazy(() => import('components/Social'));
const Footer = React.lazy(() => import('components/Footer'));

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
    <React.Fragment>
      <Helmet>
        <title>{data.name ?? data.title}</title>
        <meta name="description" content={data.description} />
      </Helmet>
      <div className="app" style={backgroundStyles}>
        { GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker /> }
        <div className="app-background" >
      <div className="app-container">
        <Suspense fallback={<div>Загрузка...</div>}>
          <Header
            name={data.name}
            avatar={data.avatar}
            profile={profile}
          />
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Notification
            link={data.url}
            message={settings.advanced}
            url={settings.advancedLink}
            buttonTitle={settings.advancedTitle}
            profile={profile}
          />
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Title />
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Messengers />
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Blocks data={data.blocks} />
          {data.ads && data.ads.length !== 0 && <Blocks data={data.ads} referrerTitle={data?.referrer?.title} />}
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Rss />
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Social />
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Footer />
        </Suspense>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Router = () => (
  <Switch>
    <Route path="/start" component={Start} />
    <Route path="/:profile/admin" component={Admin} />
    <Route path="/:profile" component={App} />
    <Route component={Landing} />
  </Switch>
);

export default Router;