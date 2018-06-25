import queryString from 'querystring';

export default function queryParser(req, res, next) {
    let query = req.url.match(/\?.+/);
    if (query) {
        query = query[0].replace('?', '');
        req.parsedQuery = queryString.parse(query);
    }
    next();
}