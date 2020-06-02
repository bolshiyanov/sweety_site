export const getSearchString = (search, variable) => {
  const query = search.substring(search.indexOf("?") + 1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable)
      return decodeURIComponent(pair[1]);
  }
  return undefined;
};

export const getUrl = () => {
  if (location.pathname.indexOf('?') >= 0) {
    return location.pathname.slice(0, location.pathname.lastIndexOf('/') - 1);
  }
  else {
    return location.pathname;
  }
}