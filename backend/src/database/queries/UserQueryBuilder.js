import { QueryBuilder } from 'objection'
import bcrypt from 'bcryptjs'

export default class MyQueryBuilder extends QueryBuilder {
  validPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}