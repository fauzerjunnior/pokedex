import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import isAuthenticated from './config/auth';

import FirstScreen from './pages/FirstScreen';

import Login from './pages/Login';
import Register from './pages/Register';

import Pokemons from './pages/Pokemons';
import AddNew from './pages/AddNew';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/pokemons', state: { from: props.location } }}
        />
      )
    }
  />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" exact component={FirstScreen} />

        <PublicRoute path="/login" exact component={Login} />
        <PublicRoute path="/register" exact component={Register} />

        <PrivateRoute path="/pokemons" component={Pokemons} />
        <PrivateRoute path="/add-new-pokemon" component={AddNew} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;