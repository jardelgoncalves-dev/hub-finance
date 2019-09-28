
exports.up = function(knex) {
  return knex.schema.createTable('expenses', table => {
    table.increments()
    table.string('name')
    table.decimal('value')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.integer('category_id').unsigned()
    table.foreign('category_id').references('id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE')
    table.timestamps()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('expenses')
};
