### steps for this example

- call `fetch()` with a single argument that is a path to a local file
  - fetch is asynchronous
  - it returns a promise
    - a promise gets resolved when an aysnchronous event is resolved
- when we call `fetch` a response comes back, presumably with the data
- grab data from body of the response and complete data stream
- make an `<img>` element with that data