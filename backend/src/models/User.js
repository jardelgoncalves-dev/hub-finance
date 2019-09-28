import { Model } from 'objection';
import bcrypt from 'bcryptjs'

import UserQueryBuilder from '../database/queries/UserQueryBuilder'

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get QueryBuilder() {
    return UserQueryBuilder;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();

    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
  
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      }
    }
  }
}
