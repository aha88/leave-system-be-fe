/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('leave_types').del()
  await knex('leave_types').insert([
    {id:1, name: 'Annual Leave', company_id: 1},
    {id:2, name: 'Emergency Leave', company_id: 1},
    {id:3, name: 'Replacement Leave', company_id: 1},
  ]);
};
