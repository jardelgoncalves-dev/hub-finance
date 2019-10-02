
exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        { id: 1, name: 'Educação', flow_type: 'expense', color: '#7567f5' },
        { id: 2, name: 'Eletrônicos', flow_type: 'expense', color: '#110391' },
        { id: 3, name: 'Lazer', flow_type: 'expense', color: '#28435e' },
        { id: 4, name: 'Outros', flow_type: 'both', color: '#18421e' },
        { id: 5, name: 'Restaurante', flow_type: 'expense', color: '#248c33' },
        { id: 6, name: 'Saúde', flow_type: 'expense', color: '#4a7550' },
        { id: 7, name: 'Serviços', flow_type: 'expense', color: '#889602' },
        { id: 8, name: 'Supermercado', flow_type: 'expense', color: '#c9710c' },
        { id: 9, name: 'Trasnporte', flow_type: 'expense', color: '#e84600' },
        { id: 10, name: 'Vestuário', flow_type: 'expense', color: '#a80755' },
        { id: 11, name: 'Presente', flow_type: 'income', color: '#b50000' },
        { id: 12, name: 'Investimento', flow_type: 'income', color: '#b00c9a' },
        { id: 13, name: 'Recompensa', flow_type: 'income', color: '#e30909' },
        { id: 14, name: 'Salário', flow_type: 'income', color: '#6e2564' } 
      ]);
    });
};
