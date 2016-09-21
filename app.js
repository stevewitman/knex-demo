var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");

screen.clear();

var charles = { firstname: "Charles", lastname: "Dickens"};
var bill = { firstname: "William ", lastname: "Shakespeare"};
var ed = { firstname: "Edgar", lastname: "Poe"};
var doc = { firstname: "Dr", lastname: "Suess"};

knex.insert([ed, doc]).into("author").returning("id").then(function(id) {
  console.log('*********ID: ',id);
  return knex("author");
})
.then(function(rows) {
  screen.write(rows, "pretty");
})
.finally(function() {
  knex.destroy();
});
