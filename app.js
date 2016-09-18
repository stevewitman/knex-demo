var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");
var Treeize = require("treeize");

screen.clear();

var query = knex("book")
      .join("author", "author_id", "=", "book.author_id")
      .select("author.firstname", "author.lastname", "book.title as books:title", "book.rating as books:rating", "book.id as books:id")
      .where("author.id", 1).debug(false)
      .then(function(rows) {
        var tree = new Treeize();
        tree.grow(rows);
        var authors = tree.getData();
        screen.write(authors[0], "json");
      })
      .finally(function() {
        knex.destroy();
      })




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
