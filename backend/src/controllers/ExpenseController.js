import CashFlow from '../models/CashFlow'
import Validator from '../helpers/validator'

export default class ExpenseController {
  static async index (req, res) {
    try {
      const expenses = await CashFlow.query()
                              .where('user_id', req.userId)
                              .where('flow_type', 'expense')
      return res.status(200).json(expenses)
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar as receitas' })
    }
  }

  static async find (req, res) {
    try {
      const { id } = req.params
      const expense = await CashFlow.query()
                                    .where('user_id', req.userId).findById(id)
                                    .where('flow_type', 'expense')
      return res.status(200).json(expense || {})
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar uma receita' })
    }
  }

  static async store (req, res) {
    try {
      const { description, value, category_id, date } = req.body
      const user_id = req.userId

      const validator = new Validator({
        'description.required': description,
        'value.required': value,
        'category_id.required': category_id,
        'date.required': date,
        'value.number': value,
        'category_id.number': category_id
      })

      if(validator.hasError()) return res.status(400).json({ error: validator.errors })

      const expense = await CashFlow.query().insert({
        description,
        value, user_id,
        category_id,
        date,
        flow_type: 'expense'
       })

      return res.status(201).json(expense)

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao cadastrar a receita' } })
    }
  }

  static async update (req, res) {
    try {
      const { id } = req.params
      const { description, value, category_id, date } = req.body

      const validator = new Validator({
        'description.required': description,
        'value.required': value,
        'date.required': date,
        'value.number': value,
        'category_id.required': category_id,
        'category_id.number': category_id
      })

      if(validator.hasError()) return res.status(400).json({ error: validator.errors })
      
      const expenseUpdated = await CashFlow.query()
                                          .where('user_id', req.userId)
                                          .where('flow_type', 'expense')
                                          .patchAndFetchById(id, {
        description,
        value,
        category_id,
        date,
        flow_type: 'expense'
      })

      return res.status(200).json(expenseUpdated)

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao atualizar a receita' } })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params

      const result = await CashFlow.query()
                                   .where('user_id', req.userId)
                                   .where('flow_type', 'expense')
                                   .findById(id)
                                   .delete()
      
      if (result) return res.status(204).send()
      if (!result) return res.status(404).send({ error: 'Receita não encontrada' })

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao atualizar a receita' } })
    }
  }
}