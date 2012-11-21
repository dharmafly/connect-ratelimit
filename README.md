connect-ratelimit
=================

```JavaScript
app = connect()
      .use(limiter({
        whitelist: ['127.0.0.1'],
        blacklist: ['example.com']
      }))
      .use(function (req, res) {
        res.end('Hello world!');
      });
```

connect-ratelimit is connect middleware for limiting the number of requests per 
client ip/hostname to your node server.

When a limit is reached the middleware will cancel the middleware chain early 
with `res.end('Rate limit exceeded.')`.

About
-----


### Catagories

By default all clients are catagorized as 'normal'. Whitelists and blacklist 
catagories exist solely as templates to help you manage requesting clients. 

#### normal

By default anyone uncatagorized will be subject to 500 requests per hour.

#### whitelist

By default client names in the whitelist will be subject to 4000 requests per 
hour.

#### blacklist

By default client names in the blacklist will be subject to 0 requests per 0 
time. In other words they will always be exceding the rate limit.

### Client identification

connect-ratelimit uses the following code to identify clients:

```JavaScript
req.headers['x-forwarded-for'] || req.connection.remoteAddress
```


Usage
-----

```JavaScript
var limiter = require('connect-ratelimit');
```

The middleware takes an options object with the following parameters:

- `whitelist`: An array of strings representing clients you wish to apply to 
the whitelist catagory.
- `blacklist`: An array of strings representing clients you wish to apply to 
the blacklist catagory.

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