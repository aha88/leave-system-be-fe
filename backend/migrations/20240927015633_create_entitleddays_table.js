/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('entitleddays', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('company_id');
        table.string('employee_id');
        table.string('start_date');
        table.string('end_date');
        table.string('leave_type_id');
        table.string('days');
        table.string('description');

        table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE');
        table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
        table.foreign('leave_type_id').references('id').inTable('leave_types').onDelete('CASCADE');

        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('entitleddays');
};
