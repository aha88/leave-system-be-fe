/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('departments').del()
  await knex('departments').insert([
    { id:1, name: 'Saas', company_id: 1},
    { id:2, name: 'Marketing', company_id: 1},
    { id:3, name: 'Enterprise', company_id: 1}
  ]);
};
