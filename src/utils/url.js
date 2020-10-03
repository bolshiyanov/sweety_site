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

export const getSearchParams = (search) => {
  const query = search.substring(1);
  const vars = query.split('&');
  let result = {};
  for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');

      if (pair.length > 1) {
        result[decodeURI(pair[0])] = decodeURIComponent(pair[1]);
      }
      else {
        result[decodeURI(pair[0])] = "";
      }
  }
  return result;
};
