
exports.up = function(knex) {
  return knex.schema.createTable('cash_flows', table => {
    table.increments()
    table.string('description')
    table.decimal('value')
    table.enu('flow_type', ['expense', 'income'])
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.integer('category_id').unsigned()
    table.foreign('category_id').references('id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE')
    table.string('month')
    table.date('date')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cash_flows')
};
