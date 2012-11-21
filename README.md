connect-ratelimit
=================

```JavaScript
app = connect()
      .use(limiter({
        limit: 256,
        clear: 6800000,
        ignore: ['127.0.0.1']
      }))
      .use(function (req, res) {
        res.end('Hello world!');
      });
```

connect-ratelimit is connect middleware for limiting the number of requests per 
client ip/hostname to your node server.

When a limit is reached the middleware will cancel the middleware chain early 
with `res.end('Rate limit exceeded.')`.

Usage
-----

```JavaScript
var limiter = require('connect-ratelimit');
```

The middleware takes an options object with the following parameters:

- `limit`: The amount (default 1000) of requests a client can make.
- `clear`: Amount in milliseconds (default 1 hour) for all currently recorded 
client visits to be forgotten.
- `ignore`: An array of strings representing clients you wish to ignore and 
will not be subject to ratelimiting.

Client identification
---------------------

connect-ratelimit uses the following code to identify clients:

```JavaScript
req.headers['x-forwarded-for'] || req.connection.remoteAddress
```

Example
-------

To play with the example app run the command below and navigate to 
[localhost:4000](http://localhost:4000)

```bash
node example.js
```

connect is required for the example to run.

```bash
npm install connect
```