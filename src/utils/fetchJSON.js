export default (url, options) =>
  fetch(url, options)
    .then(response =>
      response.json().then(json => ({ response, json })),
    )
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(Error(json));
      }
      const data = json.data || json;
      return Promise.resolve({ response, data });
    })
    .catch(error => Promise.reject(error));
