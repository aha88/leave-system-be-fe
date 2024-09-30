/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('children', function(table) {
        table.increments('id').primary(); // 'id' is auto-incrementing and primary key
        table.string('name');
        table.string('bod');
        table.string('identification_no');
        table.integer('user_id').unsigned(); 
        table.integer('company_id').unsigned(); 

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE'); 
        
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('children');
};
