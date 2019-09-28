
exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        { id: 1, name: 'Educação', created_at: 'now()', updated_at: 'now()' },
        { id: 2, name: 'Eletrônicos', created_at: 'now()', updated_at: 'now()' },
        { id: 3, name: 'Lazer', created_at: 'now()', updated_at: 'now()' },
        { id: 4, name: 'Outros', created_at: 'now()', updated_at: 'now()' },
        { id: 5, name: 'Restaurante', created_at: 'now()', updated_at: 'now()' },
        { id: 6, name: 'Saúde', created_at: 'now()', updated_at: 'now()' },
        { id: 7, name: 'Serviços', created_at: 'now()', updated_at: 'now()' },
        { id: 8, name: 'Supermercado', created_at: 'now()', updated_at: 'now()' },
        { id: 9, name: 'Trasnporte', created_at: 'now()', updated_at: 'now()' },
        { id: 10, name: 'Vestuário', created_at: 'now()', updated_at: 'now()' },
        { id: 11, name: 'Viagem', created_at: 'now()', updated_at: 'now()' }
      ]);
    });
};
