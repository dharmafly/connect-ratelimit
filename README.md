connect-ratelimit
=================

```JavaScript
app = connect()
      .use(limiter({limit: 256, clear: 68000}))
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

- `limit`: The amount (default 1000) of requests which can be made per client.
- `clear`: Amount in milliseconds (default 1 hour) for all currently recorded 
client visits to be cleared.