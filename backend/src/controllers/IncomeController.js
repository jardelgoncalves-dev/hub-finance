import CashFlow from '../models/CashFlow'
import Validator from '../helpers/validator'

export default class IncomeController {
  static async index (req, res) {
    try {
      const incomes = await CashFlow.query()
                              .where('user_id', req.userId)
                              .where('flow_type', 'income')
      return res.status(200).json(incomes)
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar as receitas' })
    }
  }

  static async find (req, res) {
    try {
      const { id } = req.params
      const incomes = await CashFlow.query()
                                    .where('user_id', req.userId).findById(id)
                                    .where('flow_type', 'income')
      return res.status(200).json(incomes || {})
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

      const income = await CashFlow.query().insert({
        description,
        value, user_id,
        category_id,
        date,
        flow_type: 'income'
       })

      return res.status(201).json(income)

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
      
      const incomeUpdated = await CashFlow.query()
                                          .where('user_id', req.userId)
                                          .where('flow_type', 'income')
                                          .patchAndFetchById(id, {
        description,
        value,
        category_id,
        date,
        flow_type: 'income'
      })

      return res.status(200).json(incomeUpdated)

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao atualizar a receita' } })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params

      const result = await CashFlow.query()
                                   .where('user_id', req.userId)
                                   .where('flow_type', 'income')
                                   .findById(id)
                                   .delete()
      
      if (result) return res.status(204).send()
      if (!result) return res.status(404).send({ error: 'Receita não encontrada' })

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao remover a receita' } })
    }
  }

  static async totalByYear (req, res) {
    try {
      const { year } = req.params
      const user_id = req.userId
  
      const validator = new Validator({
        'year.required': year,
        'year.year': year,
      })
  
      if(validator.hasError()) return res.status(400).json({ error: validator.errors })
  
      const expenses = await CashFlow.query()
                                     .select('month')
                                     .sum({ total: 'value' })
                                     .where({ user_id })
                                     .where('flow_type', 'income')
                                     .whereRaw('EXTRACT(year FROM date) = ?', year)
                                     .orderByRaw('EXTRACT(month FROM date) ASC')
                                     .groupBy('month', 'date')
      return res.status(200).json(expenses)
    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao buscar as despesa por periodo' } })
    }
  }

  static async findByYearAndMonth (req, res) {
    try {
      const { year } = req.params
      const { month } = req.params
      const user_id = req.userId
  
      const validator = new Validator({
        'year.required': year,
        'year.year': year,
        'month.required': month,
      })
  
      if(validator.hasError()) return res.status(400).json({ error: validator.errors })
  
      const incomes = await CashFlow.query()
                                     .where({ user_id })
                                     .where('flow_type', 'income')
                                     .whereRaw('EXTRACT(year FROM date) = ?', year)
                                     .whereRaw('EXTRACT(month FROM date) = ?', month)
                                     .orderBy('id', 'DESC')
                                     .eager('categories')
      return res.status(200).json(incomes)
    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao buscar as despesa por periodo' } })
    }
  }
}