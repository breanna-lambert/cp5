
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('blogposts', function(table) {
      table.increments('id').primary();
      table.string('text');
      table.string('important');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('blogposts'),
  ]);
};
