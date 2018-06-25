import http from 'http';

const server = http.createServer();

const port = process.env.PORT || 8000;

server.on('request', (req, res) => {
    const body = 'Hello World';
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(body);
});

server.listen(port);