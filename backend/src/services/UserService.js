import jwt from 'jsonwebtoken'
import User from '../models/User'
import { successResponse, errorResponse } from '../helpers/response-message'

export default class UserService {
  static async store (user) {
    try {
      const checkEmail = await User.query().where('email', user.email).limit(1)
      if (checkEmail.length) {
        return errorResponse({ email: ['Este email já está sendo usado!'] })
      }  
      const userCreated = await User.query().insert(user)
      const token = jwt.sign({ id: userCreated.id }, process.env.APP_SECRET)
      return successResponse({ user: userCreated, token }, 201)
    } catch(err) {
      return errorResponse({ message: 'Ocorreu um erro ao cadastrar o usuario' }, 422)
    }
  }
}