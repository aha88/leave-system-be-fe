/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employee_details', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('company_id');
        table.integer('employee_id');
        table.string('address1');
        table.string('address2');
        table.string('postcode');
        table.string('city');
        table.string('country');
        table.string('email');
        table.string('phone');
        table.string('handphone');

        table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE');
        table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');


        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('employee_details');
};
