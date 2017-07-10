'use strict';

let _ = require('lodash');
let moment = require('moment');

let measurementsService = require('../../service/measurements.js');
let response = require('../../common/response.js');
let securityService = require('../../service/security.js');

/**
 * Store a new measurement.
 *
 * access-token String Access token.
 * body MeasurementPostRequestBody
 * returns Measurement
 **/
module.exports = function (req, res, next) {
  let params = req.swagger.params;
  let accessToken = params["access-token"].value;
  let body = params["body"].value;

  res.setHeader("Content-Type", "application/json");

  if (!moment(body.date, moment.ISO_8601).isValid()) {
    response.end(res, 400);
  }

  try {
    let userModel = securityService.getUserModelAssociatedToAccessToken(accessToken);
    if (_.isNil(userModel)) {
      response.end(res, 401);
    } else {
      let measurement = measurementsService.insertUserMeasurement(userModel.username, body);
      if (_.isNil(measurement)) {
        response.end(res, 500);
      } else {
        response.end(res, 200, measurement);
      }
    }
  } catch (e) {
    response.end(res, 500);
  }
};
