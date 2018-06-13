const http = require('http');

const server = http.createServer();

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
};

server.on('request', (req, res) => {
    const body = JSON.stringify(product);
    res.writeHead(200, {
        'Content-Type': 'text/json'
    });
    res.end(body);
});

server.listen(8000);