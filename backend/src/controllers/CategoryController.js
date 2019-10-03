import CategoryService from '../services/CategoryService'

export default class CategoryController {
  static async index (req, res) {
    const response = await CategoryService.index()
    return res.status(response.status).json(response.data)
  }
}