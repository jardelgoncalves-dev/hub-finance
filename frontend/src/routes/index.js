import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import Add from '../pages/Add';
import Listar from '../pages/Listar';
import NotFound from '../pages/NotFound';

import history from './history'
import ProtectedRoute from '../ProtectedRoute'

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route exact path="/home" component={ProtectedRoute(Home)} />
      <Route path="/home/add/:flow" component={ProtectedRoute(Add)} />
      <Route path="/home/listar" component={ProtectedRoute(Listar)} />
      <Route path="*" component={NotFound} />
    </Switch> 
  </ConnectedRouter>
)
export default Routes