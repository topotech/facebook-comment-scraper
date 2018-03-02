export default (state, pageId) => {
  const { pageData } = state;

  if (!pageId) {
    return null;
  }

  const request = pageData.find(page => page.getIn(['data', 'id']) === pageId);

  if (!request) {
    return null;
  }

  return request.get('data');
};
