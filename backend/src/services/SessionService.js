import jwt from 'jsonwebtoken'
import User from '../models/User'
import { successResponse, errorResponse } from '../helpers/response-message'

export default class SessionService {
  static async store (user) {
    try {
      const userFind = await User.query().where('email', user.email).limit(1)

      if (userFind.length === 0) {
        return errorResponse({ message: 'Email ou password inválido!' })
      }

      if (!User.query().validPassword(user.password, userFind[0].password)) {
        return errorResponse({ message: 'Email ou password inválido!' })
      }
      const token = jwt.sign({ id: userFind[0].id }, process.env.APP_SECRET)
      return successResponse({ token, user: userFind[0] }, 200)

    } catch(err) {
      return errorResponse({ message: 'Ocorreu um erro ao processar a requisição' }, 422)
    }
  }
}