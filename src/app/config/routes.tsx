import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from '@store/context';

import Signin from '@core/pages/Signin';
import Draw from '@core/pages/DrawPage';

const MyDynamicRoute = React.lazy(() =>
  import(/* webpackChunkName: "dynamic-route" */ '@core/pages/DynamicRoute'),
);

export const AppRoutes = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={user ? Draw : Signin} />
        <Suspense fallback={<div>Loading</div>}>
          <Route
            exact
            path="/dynamic-route"
            component={MyDynamicRoute as any}
          />
        </Suspense>
      </Switch>
    </Router>
  );
};
