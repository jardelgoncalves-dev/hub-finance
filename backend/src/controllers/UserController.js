import User from '../models/User'
import UserService from '../services/UserService'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Validator from '../helpers/validator'

dotenv.config({
  path: '.env'
})

export default class UserController {
  static async store (req, res) {
    try {
      const { name, email, password } = req.body
      const validator = new Validator({
        'name.required': name,
        'email.required': email,
        'password.required': password,
        'email.email': email
      })
  
      if (validator.hasError()) return res.status(400).json({ error: validator.errors })
  
      const response = await UserService.store({ name, email, password })
      return res.status(response.status).json(response.data)
      
    } catch (err) {
      return res.status(422).json({ error: { message: 'Ocorreu um erro ao cadastrar o usuario' } })
    }
  }
}