import React from 'react';
import { useCookies } from 'react-cookie';
import { getInvite, getPublicDomain } from 'utils/api';
import { useParams } from 'react-router-dom';

const Admin = () => {
  const { profile } = useParams();
  const [_, setCookie] = useCookies();

  var inviteId = getInvite();
  if (inviteId) {
    setCookie(profile, inviteId, { domain: getPublicDomain() });
    setCookie("last", profile, { domain: getPublicDomain() });
  }

  return (
    <div/>
  );
};
  
export default Admin;
