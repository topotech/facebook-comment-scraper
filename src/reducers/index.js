import { combineReducers } from 'redux';

import api from './api';
import comments from './comments';
import networkStatus from './networkStatus';
import pageData from './pageData';
import posts from './posts';

export default combineReducers({
  api,
  comments,
  networkStatus,
  pageData,
  posts,
});
