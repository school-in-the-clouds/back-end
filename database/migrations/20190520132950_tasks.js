
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tasks', function(tbl){
      tbl.increments()
  
      tbl.string("title", 255)
        .notNullable()
  
      tbl.string("description", 255)
        .notNullable()

     tbl.boolean("task_completed").defaultTo("false")
  
      tbl.integer('user_id')
        .references('id')
        .inTable('users')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tasks")
  };