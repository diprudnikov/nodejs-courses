import User from '../models/user';

function findUser(username) {
    User.findAll().then(users => {
        const data = users.map(user => {
            return {
                firstName: user.dataValues.firstName,
                lastName: user.dataValues.lastName,
                email: user.dataValues.email,
            }
        });
    return data.find(user => user.firstName === username);
});
}

export { findUser };