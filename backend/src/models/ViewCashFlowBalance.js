import { Model } from 'objection';
import Category from './Category'

export default class CashFlow extends Model {
  static get tableName() {
    return 'view_cash_flow_balance';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        month: { type: 'string' },
        income: { type: 'number' },
        expense: { type: 'number' }
      }
    }
  }
}
