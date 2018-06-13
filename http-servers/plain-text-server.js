const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    const body = 'Hello World';
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(body);
});

server.listen(8000);