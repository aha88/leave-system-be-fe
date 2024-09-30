/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('designations').del()
  await knex('designations').insert([
    {id:1, name: 'Frontend Developer', company_id: 1},
    {id:2, name: 'Backend Developer', company_id: 1}
  ]);
};