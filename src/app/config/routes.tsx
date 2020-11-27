import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '@core/pages/Dashboard';
import MainChart from '@core/pages/MainChart';

const MyDynamicRoute = React.lazy(() =>
  import(/* webpackChunkName: "dynamic-route" */ '@core/pages/DynamicRoute'),
);

export const AppRoutes = () => {
  return (
    <Router>
      <Dashboard>
        <Switch>
          <Route path="/" exact component={MainChart} />
          <Suspense fallback={<div>Loading</div>}>
            <Route
              exact
              path="/dynamic-route"
              component={MyDynamicRoute as any}
            />
          </Suspense>
        </Switch>
      </Dashboard>
    </Router>
  );
};
