/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
        table.integer('employee_id');
        table.integer('role_id');
        table.string('status');

        table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE'); 
        table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');

        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
