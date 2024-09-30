/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('bod');
        table.string('email');
        table.string('phone');
        table.string('whatapps');
        table.string('telegram');
        table.integer('role_id');
        table.integer('designation_id');
        table.integer('department_id');
        table.integer('category_id');
        table.integer('company_id');
        table.integer('employee_details_id');
        table.integer('user_id');
        table.integer('status');

       table.foreign('designation_id').references('id').inTable('designations').onDelete('CASCADE');
       table.foreign('department_id').references('id').inTable('departments').onDelete('CASCADE');
       table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE');
       table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE');
       table.foreign('employee_details_id').references('id').inTable('employee_details').onDelete('CASCADE');
       table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.foreign('status').references('id').inTable('status_code').onDelete('CASCADE');

        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('employees');
};
