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

export const queryStringToObject = (search, smartParsing = true) => {
  const queryString = search.replace(/(^\?)/, '');
  function mapPairs(pair) {
    const [key, unparsedValue] = pair.split('=');

    if (!unparsedValue.length) {
      return this;
    }

    const rawValue = decodeURIComponent(unparsedValue || null);
    let value = rawValue;
    if (smartParsing) {
      if (rawValue.match(/^[0-9]*$/)) {
        value = parseInt(rawValue, 10);
      } else if (rawValue.match(/^(true|false)$/)) {
        value = value === 'true';
      }
    }
    this[decodeURIComponent(key)] = value;
    return this;
  }
  return queryString.length ? queryString.split('&').map(mapPairs.bind({}))[0] : {};
};
