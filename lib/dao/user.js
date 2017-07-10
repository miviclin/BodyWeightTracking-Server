'use strict';

let db = require('../database/db.js');

module.exports = {

  findByUsername: function (username) {
    return db.users.findOne({ username: username });
  },

  findByUsernameAndPassword: function (username, password) {
    return db.users.findOne({
      $and: [
        { username: username },
        { password: password }
      ]
    });
  }

};
