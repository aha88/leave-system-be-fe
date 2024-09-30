/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('companies').del()
  await knex('companies').insert([
    {
      id:1,
      name: 'Borong',
      registration_number: '12321124',
      company_address: 'no1 jalan 1231, suabng jaya',
      phone: '031231231',
      email: 'aizat@borong.com',
      status: 'A',
    },
    {
      id:2,
      name: 'PPA',
      registration_number: '3421124',
      company_address: 'no1 PJU 1231, suabng jaya',
      phone: '05232421231',
      email: 'aizat@ppa.com',
      status: 'A',
    },
  ]);
};
