/**
 * File: user.service.js
 * File Created: 02/03/2018
 * Author: annguyen
 * Description: Provides CRUD operations for user and authenticates a user.
 */
const jwt = require('jsonwebtoken');
var config = require('../config.json');

const User = require('../models/user');

module.exports = {
    create: create,
    update: update,
    delete: _delete,
    getAll: getAll,
    authenticate: authenticate
};

function authenticate(username, password) {
    return new Promise((resolve, reject) =>
        User.findOne({username:username})
            .then(user => {
                if (user && user.password === password) {
                    const token = jwt.sign(user, config.secret);
                    resolve({token: token});
                }
                else resolve(null);
            })
            .catch(err => reject(err))
    );
}

function getAll() {
    return User.find();
}

function getById(_id) {
    return User.findById(_id);
}

function create(userParam) {
    userParam._id = null;
    return User.create(userParam);
}

function update(_id, userParam) {
    return User.findByIdAndUpdate(_id, userParam);
}

function _delete(_id) {
    return User.findByIdAndRemove(_id);
}