'use strict';

let _ = require('lodash');

let measurementsService = require('../../../service/measurements.js');
let response = require('../../../common/response.js');
let securityService = require('../../../service/security.js');

/**
 * Delete the measurement associated to the specified ID.
 *
 * measurementId Integer
 * access-token String Access token.
 * no response value expected for this operation
 **/
module.exports = function (req, res, next) {
  let params = req.swagger.params;
  let measurementId = params["measurementId"].value;
  let accessToken = params["access-token"].value;

  res.setHeader("Content-Type", "application/json");

  try {
    let userModel = securityService.getUserModelAssociatedToAccessToken(accessToken);
    if (_.isNil(userModel)) {
      response.end(res, 401);
    } else {
      let deleted = measurementsService.deleteMeasurementById(measurementId);
      if (deleted) {
        response.end(res, 204);
      } else {
        response.end(res, 404);
      }
    }
  } catch (e) {
    response.end(res, 500);
  }
};
