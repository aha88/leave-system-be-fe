/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('employee_details').del()
  await knex('employee_details').insert([
    {
      id:1,
      company_id: 1,
      employee_id: 1
    },
    {
      id:2,
      company_id: 2,
      employee_id: 2
    }
    
  ]);
};