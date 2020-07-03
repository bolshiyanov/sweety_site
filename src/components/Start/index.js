import React from 'react';
import Loading from 'components/common/Loading';
import Header from 'components/Header';
import { getSearchString } from 'utils/url';

import API, { getAdminSite } from 'utils/api';
import { event } from 'utils/googleAnalytics';

import referrerAvatar from 'images/referrer_avatar.jpg';

const Start = () => {
  const instagram = getSearchString(window.location.search, 'instagram');

  const referrer = {
    title: "Free links creator",
    avatar: referrerAvatar
  }

  API.getInstagramFeed(instagram).then((instaProfile) => {
    if (!instaProfile?.feed?.title) {
      window.location.href = "/";
    } else {
      API.register({ 
          instagram,
          instagramProfile: {
            username: instaProfile?.feed?.title,
            biography: instaProfile?.feed?.biography,
            fullName: instaProfile?.feed?.fullName,
            profileImageUrl: instaProfile?.feed?.image,
            postCount: instaProfile?.feed?.postCount,
            url: instaProfile?.feed?.link,
            linkUrl: instaProfile?.feed?.externalUrl,
            posts: instaProfile?.items
          }
        }).then((response) => {
        if (response?.errors) {
          window.location.href = "/";
        }
        event("signup", "start");
        window.location.href = getAdminSite(response.invitationId);
      });
    }
  });

  return (
    <React.Fragment>
      <div className="main-page">
        <Header className="main-page__header" avatar={referrer.avatar} name={referrer.title} noConfig />
        <div className="main-page__page1">
          <div className="main-page__page1__container1">
            <h1 className="main-page__page1__header">В течение 30 секунд!</h1>
            <h2 className="main-page__page1__subtitle">И ваша страница для Instagram <b>{instagram}</b> будет готова.</h2>
          </div>
        </div>
        <Loading />
      </div>
    </React.Fragment>
  );
};

export default Start;