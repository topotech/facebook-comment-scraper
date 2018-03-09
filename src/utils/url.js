export const replaceLastPiece = (url, newLastPiece) => {
  const urlArray = url.split('/');
  urlArray.splice(urlArray.length - 1, 1, newLastPiece);
  return `/${urlArray.filter(Boolean).join('/')}`;
};

export const pushLastPiece = (url, newLastPiece) => {
  const urlArray = url.split('/');
  urlArray.push(newLastPiece);
  return `/${urlArray.filter(Boolean).join('/')}`;
};

export const objectToQueryString = (data = {}) => {
  const queryString = [];
  Object.keys(data).sort().forEach((key) => {
    const value = Array.isArray(data[key]) ? data[key].join(',') : data[key];
    if (value !== null && typeof value !== 'undefined') {
      queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  return queryString.join('&');
};
