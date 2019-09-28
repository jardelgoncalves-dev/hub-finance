
exports.up = function(knex) {
  return knex.schema.createTable('categories', table => {
    table.increments()
    table.string('name')
    table.timestamps()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories')
};
