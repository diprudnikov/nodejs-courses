import jsonwebtoken from 'jsonwebtoken';
import helpers from '../../helpers';

const generateToken = (req, res) => {
    const user = helpers.findUser(req.body.login);
    if (user === undefined || user.password !== req.body.password) {
        const message = {
            'code': 404,
            'message': 'Not Found',
            'data': {},
        };
        res.status(404).send(message);
    } else {
        const payload = { 'sub': user.id };
        const token = jsonwebtoken.sign(payload, 'secret', { expiresIn: 20 });
        const message = {
            'code': 200,
            'message': 'OK',
            'data': {
                'user': {
                    'email': user.email,
                    'username': user.username,
                }
            },
            'token': token
        };
        res.status(200).send(message);
    }
};

export { generateToken };