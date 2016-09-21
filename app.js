var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var screen = require("./screen");

screen.clear();

var doc = { firstname: "Dr.", lastname: "Suess" };
var books = [
  {title: "The Cat in the Hat", rating: 9},
  {title: "Green Eggs and Ham", rating: 10}
];

knex.transaction(function(trx) {
  return trx
    .insert(doc, "id").into("author")
    .then(function(idArr) {
      var authorID = idArr[0];
      for (var i=0; i<books.length; i++) {
        books[i].author_id = authorID
      }
      return trx.insert(books).into("book");
    });
})
.then(function() {
  screen.write(books.length + " books inserted", "pretty");
})
.catch(function(err) {
  console.error(err);
})
.finally(function() {
  knex.destroy();
})

// Alternative to using the promise aware syntax for transactions you
// can instead use a syntax in which you manually commit on success
// and rollback on error..

// knex.transaction(function(trx) {
//   trx
//     .insert(doc, "id").into("author")
//     .then(function(idArr) {
//       var authorID = idArr[0];
//       for (var i=0; i<books.length; i++) {
//         books[i].author_id = authorID
//       }
//       return trx.insert(books).into("book");
//     })
//     .then(trx.commit)
//     .catch(trx.rollback)
// })
// .then(function() {
//   screen.write(books.length + " books inserted", "pretty");
// })
// .catch(function(err) {
//   console.error(err);
// })
// .finally(function() {
//   knex.destroy();
// })
