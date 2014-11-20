var connect  = require('connect'),
    http     = require('http'),
    limiter  = require('./index');

var app  = connect()
            .use(limiter({
              // end: true,
              blacklist: ['127.0.0.1'],
              categories: {
                blacklist: {
                  totalRequests:  3,
                  // totalRequests:  0,
                  // totalRequests: -1,
                  //every: 10000
                }
              }
            }))
            .use(function (req, res) {
              if (res.ratelimit.exceeded) {
                res.end(res.ratelimit.client.name + ' exceeded the rate limit!');
              }
              res.end('Hello world!');
            });

http.createServer(app).listen(4000, function () {
  console.log('Example server on ' + 4000);
});