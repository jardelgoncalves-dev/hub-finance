import CashFlow from '../models/CashFlow'
import { successResponse, errorResponse } from '../helpers/response-message'


export default class IncomeAndExpenseService {
  static async index (user_id, type) {
    try {
      const launch = await CashFlow.query()
                              .where('user_id', user_id)
                              .where('flow_type', type)
      return successResponse(launch)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async find (id, user_id, type) {
    try {
      const launch = await CashFlow.query()
                                    .where('user_id', user_id)
                                    .findById(id)
                                    .where('flow_type', type)
      return successResponse(launch || {})
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async store (data) {
    try {

      const launch = await CashFlow.query().insert(data)
      return successResponse(launch, 201)

    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async update (data, id, user_id, type) {
    try {
      
      const launch = await CashFlow.query()
                                          .where('user_id', user_id)
                                          .where('flow_type', type)
                                          .patchAndFetchById(id, data)

      return successResponse(launch, 200)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async delete (id, user_id, type) {
    try {
      const result = await CashFlow.query()
                                   .where('user_id', user_id)
                                   .where('flow_type', type)
                                   .findById(id)
                                   .delete()
      
      if (result) return successResponse(null, 204)
      if (!result) return errorResponse({ message: 'Receita não encontrada'}, 404)

    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async totalByYear (year, user_id, type) {
    try {

      const launch = await CashFlow.query()
                                     .select('month')
                                     .sum({ total: 'value' })
                                     .where({ user_id })
                                     .where('flow_type', type)
                                     .whereRaw('EXTRACT(year FROM date) = ?', year)
                                     .orderByRaw('EXTRACT(month FROM date) ASC')
                                     .groupBy('month', 'date')

      return successResponse(launch, 200)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async findByYearAndMonth (year, month, user_id, type) {
    try {

      const launch = await CashFlow.query()
                                     .where({ user_id })
                                     .where('flow_type', type)
                                     .whereRaw('EXTRACT(year FROM date) = ?', year)
                                     .whereRaw('EXTRACT(month FROM date) = ?', month)
                                     .orderBy('id', 'DESC')
                                     .eager('categories')
      return successResponse(launch, 200)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async totalByCategories (user_id, type) {
    try {
      const launch = await CashFlow.query()
                                     .select('categories.name')
                                     .sum({ total: 'cash_flows.value' })
                                     .leftJoin('categories', 'categories.id', 'cash_flows.category_id')
                                     .where('user_id', user_id)
                                     .where('cash_flows.flow_type', type)
                                     .groupBy('categories.name', 'categories.id')
      return successResponse(launch, 200)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }

  static async limit (limit, user_id, type) {
    try {
      const launch = await CashFlow.query()
                              .where('user_id', user_id)
                              .where('flow_type', type)
                              .orderBy('id', 'DESC')
                              .limit(limit)
                              .eager('categories')

      return successResponse(launch, 200)
    } catch (err) {
      return errorResponse({message: 'Ocorreu um erro ao processar a requisição'}, 422)
    }
  }
}