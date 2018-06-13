const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    req.pipe(res);
});

server.listen(8000);