/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('leaves_pool').del()
  await knex('leaves_pool').insert([
    {
      id: 1, 
      name: 'Aizat Sas',
      company_id: 1,
      employee_id: 1,
      duration: 3,
      start_date: '2024-11-10',
      end_date: '2024-11-13',
      reason: 'rowValue1',
      leave_type_id: 1,
      employor_id: 3,
      employor_remarks: 'test 1',
      status: 2
    },
    {
      id: 2, 
      name: 'Aizat Sas',
      company_id: 1,
      employee_id: 1,
      duration: 6,
      start_date: '2024-10-01',
      end_date: '2024-10-06',
      reason: 'rowValue1',
      leave_type_id: 1,
      employor_id: 3,
      employor_remarks: 'test 2',
      status: 2
    },
    {
      id: 3, 
      name: 'Aizat Sas',
      company_id: 1,
      employee_id: 1,
      duration: 6,
      start_date: '2024-10-01',
      end_date: '2024-10-06',
      reason: 'rowValue1',
      leave_type_id: 1,
      employor_id: 3,
      employor_remarks: 'test 2',
      status: 3
    },
  ]);
};
