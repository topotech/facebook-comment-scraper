export default (state) => {
  const { pageData } = state;

  return pageData.filter(page => !page.get('error')).map(page => page.get('data')).toArray();
};
