import users from '../models/users';

function findUser(username) {
    return users.find(user => user.login === username);
}

export { findUser };