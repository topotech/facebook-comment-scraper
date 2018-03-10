/* eslint-disable import/prefer-default-export */
export const toFacebookFormat = args =>
  Object.keys(args).reduce((newObject, currentKey) => {
    let key = currentKey;
    let value = args[key];

    if (key === 'dateFrom') {
      key = 'since';
      value /= 1000;
    } else if (key === 'dateTo') {
      key = 'until';
      value /= 1000;
    }

    return {
      ...newObject,
      [key]: value,
    };
  }, {});
