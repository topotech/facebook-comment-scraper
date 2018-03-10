import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Main.less';

import Home from './Home';
import DownloadPageData from '../containers/DownloadPageData/DownloadPageData';
import DownloadPosts from '../containers/DownloadPosts/DownloadPosts';
import DownloadComments from '../containers/DownloadComments/DownloadComments';
import Settings from '../containers/Settings/Settings';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/download-page-data" component={DownloadPageData} />
      <Route exact path="/download-page-data/:pageUri" component={DownloadPageData} />
      <Route exact path="/download-posts" component={DownloadPosts} />
      <Route exact path="/download-posts/:pageId" component={DownloadPosts} />
      <Route exact path="/download-comments" component={DownloadComments} />
      <Route exact path="/download-comments/:postId" component={DownloadComments} />
      <Route exact path="/settings" component={Settings} />
    </Switch>
  </main>
);

export default Main;
