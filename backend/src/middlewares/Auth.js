import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { promisify } from 'util'

import User from '../models/User'

dotenv.config({
  path: '.env'
})

export default async (req, res, next) => {
  const authHeader = req.headers.authentication
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido!' })
  try{
    const [, token] = authHeader.split(' ')
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    const user = await User.query().findById(decoded.id)
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado!' })

    req.userId = user.id
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido!' })
  }
}