
exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        { id: 1, name: 'Educação', flow_type: 'expense' },
        { id: 2, name: 'Eletrônicos', flow_type: 'expense' },
        { id: 3, name: 'Lazer', flow_type: 'expense' },
        { id: 4, name: 'Outros', flow_type: 'both' },
        { id: 5, name: 'Restaurante', flow_type: 'expense' },
        { id: 6, name: 'Saúde', flow_type: 'expense' },
        { id: 7, name: 'Serviços', flow_type: 'expense' },
        { id: 8, name: 'Supermercado', flow_type: 'expense' },
        { id: 9, name: 'Trasnporte', flow_type: 'expense' },
        { id: 10, name: 'Vestuário', flow_type: 'expense' },
        { id: 11, name: 'Presente', flow_type: 'income' },
        { id: 12, name: 'Investimento', flow_type: 'income' },
        { id: 13, name: 'Recompensa', flow_type: 'income' },
        { id: 14, name: 'Salário', flow_type: 'income' }
      ]);
    });
};
