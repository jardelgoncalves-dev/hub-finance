import ViewCashFlow from '../models/ViewCashFlowBalance'
import CashFlow from '../models/CashFlow'



export default class CashFlowController {
  static async balance (req, res) {
    try {
      const balances = await ViewCashFlow.query()
                                         .where('user_id', req.userId)
                                         .orderBy('month', 'DESC')
                                         .limit(12)
      return res.status(200).json(balances)
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar resumo dos balanços' })
    }
  }

  static async balanceByFlowType (req, res) {
    try {
      
      const expense = await CashFlow.query()
                              .sum({ expense: 'value' })
                              .where('user_id', req.userId)
                              .where('flow_type', 'expense')
      const income = await CashFlow.query()
                              .sum({ income: 'value' })
                              .where('user_id', req.userId)
                              .where('flow_type', 'income')
      return res.status(200).json({ expense: expense[0].expense, income: income[0].income })
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar resumo dos balanços' })
    }
  }
}