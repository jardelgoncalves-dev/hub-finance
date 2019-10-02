import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import AddIncome from '../pages/AddIncome';
import AddExpense from '../pages/AddExpense';
import Listar from '../pages/Listar';

import history from './history'
import ProtectedRoute from '../ProtectedRoute'

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route exact path="/home" component={ProtectedRoute(Home)} />
      <Route path="/home/add_income" component={ProtectedRoute(AddIncome)} />
      <Route path="/home/add_expense" component={ProtectedRoute(AddExpense)} />
      <Route path="/home/listar" component={ProtectedRoute(Listar)} />
    </Switch> 
  </ConnectedRouter>
)
export default Routes