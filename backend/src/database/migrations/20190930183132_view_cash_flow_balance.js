
exports.up = function(knex) {
  return knex.raw(
    'create view view_cash_flow_balance as \
    select cash.user_id, cash.month, coalesce(sum(cash.value), 0) as expense, \
  	(select coalesce(sum(cash_income.value), 0) as income \
	  from cash_flows as cash_income \
    where cash_income.flow_type = \'income\' and cash_income."month" = cash."month" \
    and cash.user_id = cash_income.user_id \
	  group by cash_income.month) \
    from cash_flows as cash \
    where flow_type = \'expense\' \
    group by cash.month, cash.user_id'
  )
};

exports.down = function(knex) {
  return knex.raw("drop view view_cash_flow_balance");
};