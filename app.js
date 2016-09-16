var cfg = require("./knex-cfg").sqlite;
var knex = require("knex")(cfg);
var screen = require("./screen");

screen.clear();

// var query = knex.select("title", "rating").from("book");
// var sql = query.toSQL();
// screen.write(sql)

knex.select("title", "rating").from("book").asCallback(function(err, rows) {
  if (err) {
    console.error(err);
  } else {
    screen.write(rows, "pretty")
  }
  knex.destroy();
  console.log('done');
})
