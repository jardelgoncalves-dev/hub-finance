import IncomeAndExpenseService from '../services/IncomeAndExpenseService'
import Validator from '../helpers/validator'

export default class IncomeController {
  static async index (req, res) {
    try {
      const response = await IncomeAndExpenseService.index(req.userId, 'income')
      return res.status(response.status).json(response.data)
    } catch (err) {
      return res.status(422).json({ message: 'Ocorreu um erro ao buscar as despesas' })
    }
  }

  static async find (req, res) {
    try {
      const { id } = req.params

      const response = await IncomeAndExpenseService.find(id, req.userId, 'income')
      return res.status(response.status).json(response.data)
    } catch (err) {
      return res.status(422).json({ message: 'Ocorreu um erro ao buscar uma despesa' })
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

      const response = await IncomeAndExpenseService.store({
        description,
        value, user_id,
        category_id,
        date,
        flow_type: 'income'
      })

      return res.status(response.status).json(response.data)

    } catch (err) {
      return res.status(422).json({ error: { message: 'Ocorreu um erro ao cadastrar a despesa' } })
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

      const response = await IncomeAndExpenseService.update({
        description,
        value,
        category_id,
        date,
        flow_type: 'income'
      }, id, req.userId, 'income')
      return res.status(response.status).json(response.data)
    } catch (err) {
      return res.status(422).json({ error: { message: 'Ocorreu um erro ao atualizar a despesa' } })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params

      const response = await IncomeAndExpenseService.delete(id, req.userId, 'income')
      if(response.status === 204) return res.status(response.status).send()
      return res.status(response.status).json(response.data)

    } catch (err) {
      return res.status(422).json({ error: { message: 'Ocorreu um erro ao remover a despesa' } })
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
  
      const response = await IncomeAndExpenseService.totalByYear(year, user_id, 'income')
      return res.status(response.status).json(response.data)
  
    } catch (err) {
      return res.status(422).json({ error: { message: 'Ocorreu um erro ao buscar as despesa por periodo' } })
    }
  }

  static async findByYearAndMonth (req, res) {
    try {
      const { year, month } = req.params
      const user_id = req.userId
  
      const validator = new Validator({
        'year.required': year,
        'year.year': year,
        'month.required': month,
      })
  
      if(validator.hasError()) return res.status(400).json({ error: validator.errors })

      const response = await IncomeAndExpenseService.findByYearAndMonth(year, month, user_id, 'income')
      return res.status(response.status).json(response.data)
    } catch (err) {
      return res.status(422).json({ error: { message: 'Ocorreu um erro ao buscar as despesa por periodo' } })
    }
  }
}