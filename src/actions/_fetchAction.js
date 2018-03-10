import fetchJSON from '../utils/fetchJSON';

export default ({
  actions,
  url,
}) => {
  if (!actions) {
    throw new Error('No action symbols provided.');
  }

  if (actions.length !== 3) {
    throw new Error('There must be exactly 3 action symbols provided (request, success, failure).');
  }

  if (!url) {
    throw new Error('No URL provided.');
  }

  const [REQUEST, SUCCESS, FAILURE] = actions;

  return options => (dispatch, getState) => {
    const state = getState();
    const { api } = state;
    const id = api.get('id');
    const key = api.get('key');

    if (!id) {
      const error = 'Unable to make a request with no Facebook ID';
      dispatch({ type: FAILURE, error, options });
      return Promise.reject(new Error(error));
    }

    if (!key) {
      const error = 'Unable to make a request with no API Key';
      dispatch({ type: FAILURE, error, options });
      return Promise.reject(new Error(error));
    }

    const urlString = typeof url === 'function' ? url(state, options) : url;
    const joiner = urlString.includes('?') ? '&' : '?';

    dispatch({ type: REQUEST, options });
    return fetchJSON(`${urlString}${joiner}access_token=${id}|${key}`)
      .then(({ data }) => dispatch({ type: SUCCESS, data, options }))
      .catch(error => dispatch({ type: FAILURE, error, options }));
  };
};
