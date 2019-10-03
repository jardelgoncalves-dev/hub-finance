import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import SessionService from '../services/SessionService'
import User from '../models/User'
import Validator from '../helpers/validator'

dotenv.config({
  path: '.env'
})

export default class SessionController {
  static async store (req, res) {
    try {
      const { email, password } = req.body
      const validator = new Validator({
        'email.required': email,
        'password.required': password,
        'email.email': email
      })
  
      if (validator.hasError()) return res.status(400).json({ error: validator.errors })

      const response = await SessionService.store({ email, password })
      return res.status(response.status).json(response.data)
    } catch (err) {
      console.log(err)
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao processar a requisição' } })
    }
  }
}