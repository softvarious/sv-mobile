const app = require('./api');
const http = require('http');

http.createServer(app).listen(process.env.PORT);