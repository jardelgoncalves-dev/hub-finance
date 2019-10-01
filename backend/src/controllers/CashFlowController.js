import ViewCashFlow from '../models/ViewCashFlowBalance'


export default class CashFlowController {
  static async index (req, res) {
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
}