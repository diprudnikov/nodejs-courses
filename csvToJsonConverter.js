import fs from 'fs';

function convertAsync(path) {
    return new Promise((resolve, reject) => {
        let jsonObject = [];
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
            if(typeof data !== 'string'){
                reject('Invalid CSV file');
            }
            data = data.split(/\n/);
            const properties = data.shift().split(',');
            data.forEach((datum) => {
                datum = datum.split(',');
                const item = {};
                properties.forEach((property, index) => {
                    item[property] = datum[index];
                });
                jsonObject.push(item);
            });
            resolve(jsonObject);
        });
    });
}

function convertSync(path) {
    let jsonObject = [];
    let data = fs.readFileSync(path, 'utf8');
    if(typeof data !== 'string'){
        throw new Error('Invalid CSV file');
    }
    data = data.split(/\n/);
    const properties = data.shift().split(',');
    data.forEach((datum) => {
        datum = datum.split(',');
        const item = {};
        properties.forEach((property, index) => {
            item[property] = datum[index];
        });
        jsonObject.push(item);
    });
    return jsonObject;
}

export { convertAsync, convertSync };