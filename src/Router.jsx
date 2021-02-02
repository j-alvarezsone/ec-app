import React from 'react';
import { Switch, Route } from 'react-router';

// templates
import { Home, SignUp, SignIn } from './templates';
const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  );
};

export default Router;
