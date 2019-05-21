exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', function(tbl){
    tbl.increments()

    tbl.string("username", 255)
      .unique()
      .notNullable()

    tbl.string("name", 255)
      .notNullable()

      tbl.string("password", 255)
      .notNullable()

    tbl.string("role", 255)
      .notNullable()

    tbl.string("email", 255)
      .notNullable()

    tbl.string("country", 255)
    .notNullable()

    tbl.string("phone", 128)
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("profiles")
};
  
