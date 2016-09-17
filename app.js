var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");

screen.clear();

// var query = knex.select("title", "rating").from("book");
// var query = knex.select("title", "rating").from("book").first();
// var query = knex.select("title", "rating").from("book").limit(2);
// var query = knex.select("rating").from("book");
// var query = knex.select("rating").from("book").distinct();
// var query = knex.select(knex.raw("COUNT(*) as BookCount")).from("book")
// var query = knex.raw("SELECT * FROM book where author_id = 1")
var author_id = 1;
var query = knex.raw("SELECT * FROM book where author_id = ?", [author_id]);

run(query, "pretty");

function run(knexQuery, mode) {
  return knexQuery.then(function(rows) {
    screen.write(rows, mode);
  })
  .catch(function(err) {
    screen.write("Oops");
    screen.write(err);
  })
  .finally(function() {
    knex.destroy();
  })
}
