import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import MainPage from './views/MainPage';

/* Роутер для навигации по страницам приложения */
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        {/* <Route exact path="/new-video/:videoId" component={VideoPage} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
