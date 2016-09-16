// configuration object for a sqlite3 database
// var cfg = {
//   client: "sqlite3",
//   connection: {
//   filename: "./book.sqlite"
//   }
// };
// configuration object for a postgress database
var cfg = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    database: "book",
    password: "sprite"
  }
};
var knex = require("knex")(cfg);
knex.select("title", "rating").from("book").asCallback(function(err, rows) {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }
  knex.destroy();
  console.log('done');
})
