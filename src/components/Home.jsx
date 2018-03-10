import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section>
    <h2>Home</h2>
    <p>
      This tool is designed to help downloading posts and comments from Facebook using Facebook
      Graph API.
    </p>
    <h3>Getting started</h3>
    <p>
      First, provide your Facebook ID and API key in <Link to="/settings">Settings</Link>.
    </p>
    <p>
      If you know specific post/comment ID,
      you can directly get the data by providing the ID manually
      in <Link to="/download-comments">Download comments</Link> section.
    </p>
    <p>
      If you would like to browse the posts first, go
      to <Link to="/download-page-data">Download page data</Link> section and follow the links in tables provided.
    </p>
  </section>
);

export default Home;
