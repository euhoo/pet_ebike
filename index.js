if (typeof process === 'undefined') {
  const client = require('./src/client/watch');
  client();
} else {
  const server = require('./src/server/server');
  server();
}
