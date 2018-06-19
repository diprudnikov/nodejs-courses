import jsonwebtoken from 'jsonwebtoken';

export default function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        jsonwebtoken.verify(token, 'secret', (err, decoded) => {
            if (err) {

            } else {

            }
        });
    } else {

    }
}