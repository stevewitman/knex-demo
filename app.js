var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");

screen.clear();

// var query = knex.select("title", "rating").from("book").orderByRaw('title desc');

// var query = knex.select("title", "id`").from("book").orderBy('id').limit(2).offset(2);

// var query = knex("book").min("rating as lowScore");

// var query = knex("book").select("author_id").min("rating as lowScore").groupBy("author_id");

// var query = knex("author").where({"firstname": "Mark", "lastname": "Twain"});

// var query = knex("author").where("id", 1);

// var query = knex("author").where("id", "<>", 1);

// var query = knex("author").where("id", "in", [1,2,3]);

// var subquery = knex("author").select("id").where("id", ">", 1);
// var query = knex("author").where("id", "in", subquery);

// var query = knex("author").where(function() {
//   this.where("id", 1).orWhere("id", ">", 3);
// });

// var query = knex("author").where(function() {
//   this.where("id", 1).orWhere("id", ">", 3);
// }).orWhere({firstname: "Mark"});

// var query = knex("book").whereExists(function() {
//   this.from("author").whereRaw("1=1")
// });

// var query = knex("book").join("author", "author_id", "=", "book.author_id").select("author.firstname", "author.lastname", "book.title");

var query = knex("book").join("author", function() {
  this.on("author_id", "=", "book.author_id")
}).select("author.firstname", "author.lastname", "book.title");




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
