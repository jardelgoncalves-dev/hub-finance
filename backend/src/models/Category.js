import { Model } from 'objection';
import CashFlow from '../models/CashFlow'

export default class Category extends Model {
  static get tableName() {
    return 'categories';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],
  
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        flow_type: { type: 'string' },
      }
    }
  }

  static get relationMappings () {
    return {
      cash_flows: {
        relation: Model.BelongsToOneRelation,
        modelClass: CashFlow,
        join: {
          from: 'categories.id',
          to: 'cash_flows.category_id'
        }
      }
    }
  }
}
