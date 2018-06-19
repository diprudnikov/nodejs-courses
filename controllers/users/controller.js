import users from '../../models/users';

const getAllUsersHandler = (req, res) => {
    res.json(users);
};

export { getAllUsersHandler };