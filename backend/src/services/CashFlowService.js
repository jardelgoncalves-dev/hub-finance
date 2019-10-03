import ViewCashFlow from '../models/ViewCashFlowBalance'
import CashFlow from '../models/CashFlow'
import { successResponse, errorResponse } from '../helpers/response-message'

export default class CashFlowService {
  static async findBalance (user_id) {
    try {
      const balances = await ViewCashFlow.query()
                                         .where('user_id', user_id)
                                         .orderBy('month', 'DESC')
                                         .limit(12)
      return successResponse(balances)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async findBalanceByFlowType (user_id) {
    try {
      const expense = await CashFlow.query()
                                    .sum({ expense: 'value' })
                                    .where('user_id', user_id)
                                    .where('flow_type', 'expense')

      const income = await CashFlow.query()
                                   .sum({ income: 'value' })
                                   .where('user_id', user_id)
                                   .where('flow_type', 'income')
      
      return successResponse({ expense: expense[0].expense, income: income[0].income })
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }
}