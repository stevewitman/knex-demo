var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");

screen.clear();

var charles = { firstname: "Charles", lastname: "Dickens"};
var bill = { firstname: "William ", lastname: "Shakespeare"};
var ed = { firstname: "Edgar", lastname: "Poe"};
var doc = { firstname: "Dr", lastname: "Suess"};

knex("author").where("id", ">", 4).del().then(function(count) {
  console.log(count);
  return knex("author");
})
.then(function(rows) {
  screen.write(rows, "pretty");
})
.finally(function() {
  knex.destroy();
});
