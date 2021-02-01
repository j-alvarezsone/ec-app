import React from 'react';
import { Switch, Route } from 'react-router';

// templates
import { Home, Login } from '../templates';
const Router = () => {
  return (
    <Switch>
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  );
};

export default Router;
