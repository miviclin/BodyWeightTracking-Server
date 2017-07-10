'use strict';

let _ = require('lodash');

let measurementsService = require('../../../service/measurements.js');
let response = require('../../../common/response.js');
let securityService = require('../../../service/security.js');

/**
 * Edit the measurement associated to the specified ID.
 *
 * measurementId Integer
 * access-token String Access token.
 * body MeasurementPatchRequestBody
 * returns Measurement
 **/
module.exports = function (req, res, next) {
  let params = req.swagger.params;
  let measurementId = params["measurementId"].value;
  let accessToken = params["access-token"].value;
  let body = params["body"].value;

  res.setHeader("Content-Type", "application/json");

  try {
    let userModel = securityService.getUserModelAssociatedToAccessToken(accessToken);
    if (_.isNil(userModel)) {
      response.end(res, 401);
    } else {
      let updatedMeasurement = measurementsService.updateMeasurement(measurementId, body);
      if (_.isNil(updatedMeasurement)) {
        response.end(res, 404);
      } else {
        response.end(res, 200, updatedMeasurement);
      }
    }
  } catch (e) {
    console.log(e)
    response.end(res, 500);
  }
};
