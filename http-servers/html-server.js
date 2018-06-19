import http from 'http';
import fs from 'fs';
import through from 'through2';

const server = http.createServer();

const port = process.env.PORT || 8000;

const message = 'Hello World';

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    // const file = fs.readFileSync('index.html');
    // let data = file.toString();
    // data = data.replace(/{message}/ig, message);
    // res.write(data);
    const transform = through(
        function (buffer, encoding, next) {
            this.push(buffer.toString().replace(/{message}/ig, message));
            next();
        },
        function (done) {
            done()
        },
    );
    const read = fs.createReadStream('index.html');
    read.pipe(transform).pipe(res);
});

server.listen(port);