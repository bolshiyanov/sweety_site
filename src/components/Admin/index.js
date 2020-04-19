import React from 'react';
import { useCookies } from 'react-cookie';
import { getInvite, getCookieDomain } from 'utils/api';
import { useParams } from 'react-router-dom';

const Admin = () => {
  const { profile } = useParams();
  const [_, setCookie, removeCookie] = useCookies();

  var inviteId = getInvite();
  if (inviteId) {
    setCookie(profile, inviteId, { path: '/' });
    removeCookie("last", { domain: getCookieDomain() });
    setCookie("last", inviteId, { domain: getCookieDomain() });
  }

  return (
    <div/>
  );
};
  
export default Admin;
