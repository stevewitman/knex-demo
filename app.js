var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");

screen.clear();

var charles = { firstname: "Charles", lastname: "Dickens"};
var bill = { firstname: "William ", lastname: "Shakespeare"};
var ed = { firstname: "Edgar", lastname: "Poe"};
var doc = { firstname: "Dr", lastname: "Suess"};

knex("book").where("author_id", "=", 1).update({rating: 0})
.then(function(count) {
  console.log(count);
  return knex("book").select("author_id", "title", "rating");
})
.then(function(rows) {
  screen.write(rows, "pretty");
})
.finally(function() {
  knex.destroy();
});
