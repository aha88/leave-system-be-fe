/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('leaves_pool', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('company_id');
        table.integer('employee_id');
        table.integer('duration');
        table.string('start_date');
        table.string('end_date');
        table.string('reason');
        table.string('attachment');
        table.integer('leave_type_id');
        table.integer('employor_id');
        table.string('employor_remarks');
        table.integer('status');

        table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE');
        table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
        table.foreign('employor_id').references('id').inTable('employees').onDelete('CASCADE');
        table.foreign('leave_type_id').references('id').inTable('leave_types').onDelete('CASCADE');
        table.foreign('status').references('id').inTable('status_leave_code').onDelete('CASCADE');


        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('leaves_pool');
};
