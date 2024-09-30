/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {id: 1, name: 'Executive', company_id: 1},
    {id: 2, name: 'Non-Executive', company_id: 1},
    {id: 3, name: 'Contract', company_id: 1},
    {id: 4, name: 'Part-time', company_id: 1},
    {id: 5, name: 'Intern', company_id: 1}
  ]);
};
