var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");
var Treeize = require("treeize");
var Promise = require("bluebird");

screen.clear();
var pAuthorRows = knex("author").where("id", 1).debug(false).then();
var pBooks = knex("book").where("author_id", 1).debug(false).then();

Promise.all([pAuthorRows, pBooks]).then(function(results) {
  var author = results[0][0];
  author.books = results[1];
  screen.write(author, "json");
}).finally(function() {
  knex.destroy();
})
