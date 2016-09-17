In the examples so far, we've been running queries using the Knex's callback interface. Instead we should use the more promise interface, which simlifies the writing of asynchronous code.

> **Promise**

> An object that represents an operation, such as a query, that hasn't completed yet, and allows you to specify success and failure handlers for an asynchronous action in a way that looks like synchronous code.

Using promises makes it much simpler when you need to manage multiple database queries that you may wish to have run in parallel or serially.
