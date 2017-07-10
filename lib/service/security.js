'use strict';

let _ = require('lodash');

let userDao = require('../dao/user.js');

let sessions = [];

function removeSession(username) {
  sessions = sessions.filter((session) => {
    return session.username.localeCompare(username) !== 0;
  });
}

function convertLokiUserDataToBusinessModel(user) {
  return {
    username: user.username,
    avatarUrl: user.avatarUrl
  };
}

module.exports = {

  authorize: function (username, password) {
    let user = userDao.findByUsernameAndPassword(username, password);

    let accessToken;
    if (!_.isNil(user)) {
      let currentTime = Date.now();
      accessToken = `${username}_${currentTime}`;

      removeSession(username);
      sessions.push({
        accessToken: accessToken,
        username: username
      });
    }
    return accessToken;
  },

  getUserModelAssociatedToAccessToken: function (accessToken) {
    let session;
    if (!_.isNil(accessToken)) {
      session = sessions.find((session) => {
        return session.accessToken.localeCompare(accessToken) === 0
      });
    }

    let userModel;
    if (!_.isNil(session)) {
      let user = userDao.findByUsername(session.username);
      if (_.isNil(user)) {
        removeSession(username);
      } else {
        userModel = convertLokiUserDataToBusinessModel(user);
      }
    }
    return userModel;
  }

};
