import User from '../../models/user';

const getAllUsersHandler = (req, res) => {
    return User.findAll().then(users => {
        const data = users.map(user => {
            return {
                firstName: user.dataValues.firstName,
                lastName: user.dataValues.lastName,
                email: user.dataValues.email,
            }
        });
        res.json(data);
    });
};

export { getAllUsersHandler };