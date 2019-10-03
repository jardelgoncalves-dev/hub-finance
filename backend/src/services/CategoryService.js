import Category from '../models/Category'
import { successResponse, errorResponse } from '../helpers/response-message'

export default class CategoryService {
  static async index () {
    try {
      const categories = await Category.query()
      return successResponse(categories)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao buscar as categorias'}, 422)
    }
  }
}