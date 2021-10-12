import React from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAuth} from './auth';

function PrivateRoute({component: Component, ...rest}) {
  const {admin} = useAuth();
  const location = useLocation();
  return (
    <Route {...rest}>{admin ?
      <Component/>
      : <Redirect to={{pathname: '/', state: {referer: location}}}/>}
    </Route>
  );
}

export default PrivateRoute;
