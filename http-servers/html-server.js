const http = require('http');
const fs = require('fs');

const server = http.createServer();
const message = 'Hello World';

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    // const file = fs.readFileSync('index.html');
    // let data = file.toString();
    // data = data.replace(/{message}/ig, message);
    // res.write(data);
    const read = fs.createReadStream('index.html');
    read.pipe(res);
});

server.listen(8000);