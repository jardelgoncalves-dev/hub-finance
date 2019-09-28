
exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        { id: 1, name: 'Educação', income: false, expense: true },
        { id: 2, name: 'Eletrônicos', income: false, expense: true },
        { id: 3, name: 'Lazer', income: false, expense: true },
        { id: 4, name: 'Outros', income: true, expense: true },
        { id: 5, name: 'Restaurante', income: false, expense: true },
        { id: 6, name: 'Saúde', income: false, expense: true },
        { id: 7, name: 'Serviços', income: false, expense: true },
        { id: 8, name: 'Supermercado', income: false, expense: true },
        { id: 9, name: 'Trasnporte', income: false, expense: true },
        { id: 10, name: 'Vestuário', income: false, expense: true },
        { id: 11, name: 'Presente', income: true, expense: false },
        { id: 12, name: 'Investimento', income: true, expense: false },
        { id: 13, name: 'Recompensa', income: true, expense: false },
        { id: 14, name: 'Salário', income: true, expense: false }

      ]);
    });
};
