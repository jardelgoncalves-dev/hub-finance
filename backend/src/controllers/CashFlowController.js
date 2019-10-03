import CashFlowService from '../services/CashFlowService'

export default class CashFlowController {
  static async balance (req, res) {
    try {
      const response = await CashFlowService.findBalance(req.userId)
      return res.status(response.status).json(response.data)
    } catch (err) {
      return res.status(422).json({ message: 'Ocorreu um erro ao buscar resumo dos balanços' })
    }
  }

  static async balanceByFlowType (req, res) {
    try {
      const response = await CashFlowService.findBalanceByFlowType(req.userId)
      return res.status(response.status).json(response.data)
    } catch (err) {
      return res.status(422).json({ message: 'Ocorreu um erro ao buscar resumo dos balanços' })
    }
  }
}