import express from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import IncomeController from './controllers/IncomeController'
import ExpenseController from './controllers/ExpenseController'
import CategoryController from './controllers/CategoryController'
import CashFlowController from './controllers/CashFlowController'

import AuthMiddleware from './middlewares/Auth'

const routes = express.Router()

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)
routes.get('/categories', CategoryController.index)

routes.use(AuthMiddleware)

routes.get('/incomes', IncomeController.index)
routes.get('/incomes/:id', IncomeController.find)
routes.post('/incomes', IncomeController.store)
routes.put('/incomes/:id', IncomeController.update)
routes.delete('/incomes/:id', IncomeController.delete)
routes.get('/incomes/:year/:month/period', IncomeController.findByYearAndMonth)

routes.get('/expenses', ExpenseController.index)
routes.get('/expenses/:id', ExpenseController.find)
routes.post('/expenses', ExpenseController.store)
routes.put('/expenses/:id', ExpenseController.update)
routes.delete('/expenses/:id', ExpenseController.delete)
routes.get('/expenses/total/categories', ExpenseController.totalByCategories)
routes.get('/expenses/:year/:month/period', ExpenseController.findByYearAndMonth)
routes.get('/expenses/paginate/:limit?', ExpenseController.limit)

routes.get('/cashflow/balance', CashFlowController.balance)
routes.get('/cashflow/balance/flowtype', CashFlowController.balanceByFlowType)


export default routes