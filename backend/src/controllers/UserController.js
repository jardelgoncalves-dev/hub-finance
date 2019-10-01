import User from '../models/User'
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
  
      const checkEmail = await User.query().where('email', email).limit(1)
      if (checkEmail.length) return res.status(400).json({ error: { email: ['Este email já está sendo usado!'] } })
  
      const user = await User.query().insert({ name, email, password })
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET)
  
      return res.status(201).json({ token, user })
    } catch (err) {
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao cadastrar o usuario' } })
    }
  }
}