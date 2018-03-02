export const SET_ID = 'SET_ID';
export const SET_KEY = 'SET_KEY';

export const setId = id => ({
  type: SET_ID,
  id,
});

export const setKey = key => ({
  type: SET_KEY,
  key,
});
