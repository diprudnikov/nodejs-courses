export default function cookieParser(req, res, next) {
    req.parsedCookies = req.headers.cookie;
    next();
}