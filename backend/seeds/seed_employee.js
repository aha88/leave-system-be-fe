/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('employees').del()
  await knex('employees').insert([
    {
      id:1,
      name: 'Employee Saas',
      bod: '1988-11-11',
      email: 'aizat@mail.com',
      phone: '601231231221',
      whatapps: '601231231221',
      telegram: '601231231221',
      role_id: 1,
      designation_id: 1,
      department_id: 1,
      category_id: 1,
      company_id: 1,
      employee_details_id: 1,
      user_id: 1,
      status: 'A',
    },
    {
      id:2,
      name: 'Employee PPA',
      bod: '1988-11-11',
      email: 'aizat@mail.com',
      phone: '601231231221',
      whatapps: '601231231221',
      telegram: '601231231221',
      role_id: 1,
      designation_id: 2,
      department_id: 2,
      category_id: 2,
      company_id: 2,
      employee_details_id: 2,
      user_id: 1,
      status: 'A',
    },
  ]);
};