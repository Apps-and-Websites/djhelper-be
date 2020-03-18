require('dotenv').config();

const fs = require('fs');
const https = require('https');
const server = require('./server.js');

const PORT = process.env.PORT || 9000;

// Add "USE_HTTPS = true" in .env file in production environment.
if (process.env.USE_HTTPS === 'true') {
  https
    .createServer(
      {
        key: fs.redFileSync('./cert/server.key'),
        cert: fs.readFileSync('./cert/server.cert')
      },
      server
    )
    .listen(PORT, () => {
      console.log(`\n=== Secure server listening on port ${PORT} ===\n`);
    });
} else {
  server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });
}
