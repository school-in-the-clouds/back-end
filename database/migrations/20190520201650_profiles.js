exports.up = function(knex, Promise) {
    return knex.schema.createTable('profiles', function(tbl){
      tbl.increments()
  
      tbl.string("username", 255)
      .references('username')
      .inTable('users')
  
      tbl.string("name", 255)
      .references('name')
      .inTable('users')
  
      tbl.string("role", 255)
      .references('role')
      .inTable('users')
  
      tbl.string("email", 255)
      .references('email')
      .inTable('users')

      tbl.string("country", 255)
      .references('country')
      .inTable('users')
  
      tbl.string("phone", 128)
      .references('phone')
      .inTable('users')
  
      tbl.integer('user_id')
        .references('id')
        .inTable('users')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("profiles")
  
  };
