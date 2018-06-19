import http from 'http';

const server = http.createServer();

const port = process.env.PORT || 8000;

server.on('request', (req, res) => {
    req.pipe(res);
});

server.listen(port);