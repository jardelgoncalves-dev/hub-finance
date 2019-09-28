import { Model } from 'objection';
import Category from './Category'

export default class CashFlow extends Model {
  static get tableName() {
    return 'cash_flows';
  }

  $beforeInsert() {
    this.date = new Date(this.date)
    this.month = this.date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['description', 'value', 'user_id', 'category_id', 'date', 'flow_type'],
  
      properties: {
        id: { type: 'integer' },
        description: { type: 'string', minLength: 1, maxLength: 255 },
        value: { type: 'number' },
        user_id: { type: 'integer' },
        category_id: { type: 'integer' },
        date: { type: 'string' },
        month: { type: 'string' },
        flow_type: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      categories: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'cash_flows.category_id',
          to: 'categories.id'
        }
      }
    }
  }
}
