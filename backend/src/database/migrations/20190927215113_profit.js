
exports.up = function(knex) {
  return knex.schema.createTable('profits', table => {
    table.increments()
    table.string('name')
    table.decimal('value')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.timestamps()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('profits')
};
