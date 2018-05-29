import Converter from '../../csvToJsonConverter';
import fs from 'fs';
import path from 'path';
import parseArgs from 'minimist';
import through from 'through2';

const converter = new Converter();

const rootPath = path.normalize(__dirname + '../../../../');
const dataPath = path.normalize(rootPath + '/data/');

const Commands = ['help', 'action', 'file', 'path'];

const Actions = {
    'reverse': () => reverse(),
    'transform': () => transform(),
    'outputFile': (filePath) => outputFile(filePath),
    'convertFromFile': (filePath) => convertFromFile(filePath),
    'convertToFile': (filePath) => convertToFile(filePath),
    'cssBundler': (filePath) => cssBundler(filePath),
};

const args = parseArgs(process.argv.slice(2), {
    alias: {
        'help': 'h',
        'action': 'a',
        'file': 'f',
        'path': 'p',
    },
    unknown: (arg) => {
        const argument = arg.slice(2, '-' + arg.slice(arg.indexOf('=')).length);
        if (!Commands.includes(argument)) {
            console.error('Unknown option', arg);
            return false;
        }
    }
});

if (process.argv[2] === undefined) {
    process.stdout.write('Wrong input \n');
    showHelpMessage();
} else if (process.argv[2] === '--help' || process.argv[2] === '--h') {
    showHelpMessage();
} else {
    if (args.action) {
        if (Actions.hasOwnProperty(args.action)) {
            const files = fs.readdirSync(dataPath);
            const fileName = args.file;
            const pathToFile = args.path;
            if (fileName) {
                if (files.includes(fileName)) {
                    Actions[args.action](fileName);
                } else {
                    console.error('No such file', fileName);
                }
            } else if (pathToFile) {
                Actions[args.action](pathToFile);
            } else {
                Actions[args.action]();
            }
        } else {

        }
    }
}

function showHelpMessage() {
    process.stdout.write('Possible options:\n' +
        '--action/--a=(type action here) - execute typed action\n' +
        '   second options for action:\n' +
        '   --file/--f=(type file name) - execute action for typed file\n' +
        '   --path/--p=(type path to file) - execute action for typed path\n' +
        '--help/--h - show usage message\n')
}

function reverse() {
    const reverseStream = through(
        function (buffer, encoding, next) {
            this.push(buffer.toString().split('').reverse().join('').replace(/\n/g, "") + '\n');
            next();
        },
        function (done) {
            done()
        },
    );
    process.stdin.pipe(reverseStream).pipe(process.stdout);
}

function transform() {
    const transformStream = through(
        function (buffer, encoding, next) {
            this.push(buffer.toString().toUpperCase());
            next();
        },
        function (done) {
            done()
        },
    );
    process.stdin.pipe(transformStream).pipe(process.stdout);
}

function outputFile(fileName) {
    const readStream = fs.createReadStream(path.normalize(dataPath + fileName));
    readStream.on('error', (err) => {
        console.error(err);
    });
    readStream.pipe(process.stdout);
}

function convertFromFile(fileName) {
    const transformStream = through(
        function (buffer, encoding, next) {
            const data = buffer.toString();
            const convertedData = converter.convertData(data);
            this.push(JSON.stringify(convertedData));
            next();
        },
        function (done) {
            done()
        },
    );
    const readStream = fs.createReadStream(path.normalize(dataPath + fileName));
    readStream.on('error', (err) => {
        console.error(err);
    });
    readStream.pipe(transformStream).pipe(process.stdout);
}

function convertToFile(fileName) {
    const paths = path.normalize(dataPath + fileName);
    const transformStream = through(
        function (buffer, encoding, next) {
            const data = buffer.toString();
            const convertedData = converter.convertData(data);
            this.push(JSON.stringify(convertedData));
            next();
        },
        function (done) {
            done()
        },
    );
    const readStream = fs.createReadStream(paths);
    readStream.on('error', (err) => {
        console.error(err);
    });
    const writeStream = fs.createWriteStream(`${paths.slice(0, paths.indexOf('.'))}.json`);
    writeStream.on('error', (err) => {
        console.error(err);
    });
    readStream.pipe(transformStream).pipe(writeStream);
}

function cssBundler(filesPath) {
    const pathToCss = path.normalize(rootPath + '/' + filesPath);
    fs.readdir(pathToCss, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        const writeStream = fs.createWriteStream(path.normalize(pathToCss + '/bundle.css'));
        files.forEach((file) => {
            const readStream = fs.createReadStream(path.normalize(pathToCss + '/' + file));
            readStream.pipe(writeStream);
        });
        const additionalFile = fs.createReadStream(path.normalize(rootPath + '/assets/nodejs-homework3.css'));
        additionalFile.pipe(writeStream);
    });
}