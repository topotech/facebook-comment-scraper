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
