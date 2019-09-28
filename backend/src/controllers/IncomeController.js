import Income from '../models/Income'
import Validator from '../helpers/validator'

export default class IncomeController {
  static async index (req, res) {
    try {
      const incomes = await Income.query().where('user_id', req.userId)
      return res.status(200).json(incomes)
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar as receitas' })
    }
  }

  static async find (req, res) {
    try {
      const { id } = req.params
      const incomes = await Income.query().where('user_id', req.userId).findById(id)
      return res.status(200).json(incomes || {})
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar uma receita' })
    }
  }

  static async store (req, res) {
    try {
      const { description, value, category_id } = req.body
      const user_id = req.userId

      const validator = new Validator({
        'description.required': description,
        'value.required': value,
        'category_id.required': category_id,
        'value.number': value,
        'category_id.number': category_id
      })

      if(validator.hasError()) return res.status(400).json({ error: validator.errors })

      const income = await Income.query().insert({ description, value, user_id, category_id })
      return res.status(201).json(income)

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao cadastrar a receita' } })
    }
  }

  static async update (req, res) {
    try {
      const { id } = req.params
      const { description, value, category_id } = req.body

      const validator = new Validator({
        'description.required': description,
        'value.required': value,
        'value.number': value,
        'category_id.required': category_id,
        'category_id.number': category_id
      })

      if(validator.hasError()) return res.status(400).json({ error: validator.errors })
      
      const incomeUpdated = await Income.query().where('user_id', req.userId).patchAndFetchById(id, {
        description,
        value,
        category_id
      })

      return res.status(200).json(incomeUpdated)

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao atualizar a receita' } })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params

      const result = await Income.query().where('user_id', req.userId).findById(id).delete()
      
      if (result) return res.status(204).send()
      if (!result) return res.status(404).send({ error: 'Receita não encontrada' })

    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao atualizar a receita' } })
    }
  }
}