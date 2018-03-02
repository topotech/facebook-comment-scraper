import { combineReducers } from 'redux';

import api from './api';
import comments from './comments';
import pageData from './pageData';
import posts from './posts';

export default combineReducers({
  api,
  comments,
  pageData,
  posts,
});
