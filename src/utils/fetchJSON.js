export default (url, options) =>
  fetch(url, options)
    .then(response =>
      response.json().then(json => ({ response, json })),
    )
    .then(({ response, json }) => {
      if (!response.ok) {
        const error = (
          (json.error && json.error.message) ?
            new Error(json.error.message) :
            new Error('Unknown error')
        );
        return Promise.reject(error);
      }
      const data = json.data || json;
      return Promise.resolve({ response, data });
    })
    .catch(error => Promise.reject(error));
