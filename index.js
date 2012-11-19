var clients = {},
    limit;

module.exports = function (options) {
  var options = options       || {};
  limit       = options.limit || 5;
  setInterval(clearClients, options.every || 60 * 60 * 1000);
  return middleware;
}

function middleware (req, res, next) {
  var ip = getClientAddress(req);

  if (!clientExists(ip)) {
    trackNewClient(ip);
  }

  tickClient(ip);


  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', clients[ip]);

  if (checkOk(ip)) {
    console.log(clients);
    next();
  } else {
    clients[ip] = 0;
    res.end('Rate limit exceeded');
  }
};

function getClientAddress(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

function clearClients () {
  clients = {};
}

function clientExists (ip) {
  if (ip in clients) return true;
  return false;
}

function tickClient (ip) {
  clients[ip] -= 1;
}

function trackNewClient (ip) {
  clients[ip] = limit;
}
function checkOk (ip) {
  if (clients[ip] < 1) {
    return false;
  } else {
    return true;
  }
}