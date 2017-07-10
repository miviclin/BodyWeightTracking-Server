'use strict';

let _ = require('lodash');

let response = require('../../common/response.js');
let securityService = require('../../service/security.js');

/**
 * Authorize the user to access data.
 *
 * body LoginPostRequestBody
 * returns User
 **/
module.exports = function (req, res, next) {
  let params = req.swagger.params;
  let username = params.body.value.username;
  let password = params.body.value.password;

  res.setHeader("Content-Type", "application/json");

  try {
    let accessToken = securityService.authorize(username, password);
    if (_.isNil(accessToken)) {
      response.end(res, 401);
    } else {
      res.setHeader("access-token", accessToken);

      let userModel = securityService.getUserModelAssociatedToAccessToken(accessToken);
      response.end(res, 200, userModel);
    }
  } catch (e) {
    response.end(res, 500);
  }
};
