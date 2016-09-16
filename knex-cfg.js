module.exports = {
  pg: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "sw",
      database: "sw",
      password: "sprite"
    },
    debug: true
  },
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./book.sqlite"
    },
    debug: true
  }
};
