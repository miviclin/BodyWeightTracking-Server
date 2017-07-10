'use strict';

let _ = require('lodash');

let measurementsService = require('../../service/measurements.js');
let response = require('../../common/response.js');
let securityService = require('../../service/security.js');

/**
 * Get bodyweight measurements.
 *
 * access-token String Access token.
 * returns List
 **/
module.exports = function (req, res, next) {
  let params = req.swagger.params;
  let accessToken = params["access-token"].value;

  res.setHeader("Content-Type", "application/json");

  try {
    let userModel = securityService.getUserModelAssociatedToAccessToken(accessToken);
    if (_.isNil(userModel)) {
      response.end(res, 401);
    } else {
      let measurements = measurementsService.getUserMeasurements(userModel.username);
      response.end(res, 200, measurements);
    }
  } catch (e) {
    response.end(res, 500);
  }
};
