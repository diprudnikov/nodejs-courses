import queryString from 'querystring';

export default function queryParser(req, res, next) {
    const query = req.url.match(/\?.+/)[0].replace('?', '');
    req.parsedQuery = queryString.parse(query);
    next();
}