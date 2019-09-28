import { Model } from 'objection';
import User from './User'

export default class Income extends Model {
  static get tableName() {
    return 'categories';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],
  
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        income: { type: 'boolean' },
        expense: { type: 'boolean'},
      }
    }
  }

  static get relationMappings () {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'profits.user_id',
          to: 'users.id'
        }
      }
    }
  }
}
