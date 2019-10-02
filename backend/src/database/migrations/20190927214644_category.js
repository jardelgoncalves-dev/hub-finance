
exports.up = function(knex) {
  return knex.schema.createTable('categories', table => {
    table.increments()
    table.string('name')
    table.enu('flow_type', ['income', 'expense', 'both'])
    table.string('color')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories')
};
