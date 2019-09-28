import Category from '../models/Category'

export default class CategoryController {
  static async index (req, res) {
    try {
      const categories = await Category.query()
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(501).json({ message: 'Ocorreu um erro ao buscar as categorias' })
    }
  }
}