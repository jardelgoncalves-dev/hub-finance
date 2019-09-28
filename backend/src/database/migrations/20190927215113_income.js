
exports.up = function(knex) {
  return knex.schema.createTable('incomes', table => {
    table.increments()
    table.string('description')
    table.decimal('value')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.integer('category_id').unsigned()
    table.foreign('category_id').references('id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE')
    table.timestamps()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incomes')
};
