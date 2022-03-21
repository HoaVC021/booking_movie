import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Admin from '../../containers/Admin/Admin';

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => (auth ? children : <Redirect to="/auth" />)}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Public} />
      <PrivateRoute path="/admin" component={Admin} />
    </BrowserRouter>
  );
}
