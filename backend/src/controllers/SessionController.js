import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../models/User'
import Validator from '../helpers/validator'


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
  
      const user = await User.query().where('email', email).limit(1)

      if (user.length === 0) return res.status(400).json({ error: { message: 'Email ou password inválido!' } })
      if (!User.query().validPassword(password, user[0].password)) {
        return res.status(400).json({ error: { message: 'Email ou password inválido!' } })
      }

      const token = jwt.sign(user[0].id, "test")
      return res.status(200).json({ token })

    } catch (err) {
      console.log(err)
      return res.status(501).json({ error: { message: 'Ocorreu um erro ao cadastrar o usuario' } })
    }
  }
}

function passwordValid(password, password_hash) {
  return bcrypt.compareSync(password, password_hash)
}