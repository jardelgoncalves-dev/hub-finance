import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';

import history from './history'
import ProtectedRoute from '../ProtectedRoute'

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/home" component={ProtectedRoute(Home)} />
    </Switch> 
  </ConnectedRouter>
)
export default Routes