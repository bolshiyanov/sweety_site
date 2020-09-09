export const getSearchString = (search, variable) => {
  const query = search.substring(search.indexOf("?") + 1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      if (pair.length == 1)
        return "";
      return decodeURIComponent(pair[1]);
    }
  }
  return undefined;
};
