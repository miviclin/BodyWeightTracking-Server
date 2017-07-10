'use strict';

let _ = require('lodash');

let measurementDao = require('../dao/measurement.js');

function convertLokiMeasurementDataToBusinessModel(measurement) {
  return {
    id: measurement["$loki"],
    value: measurement.value,
    unit: measurement.unit,
    date: measurement.date
  };
}

module.exports = {

  getUserMeasurements: function (username) {
    let result = measurementDao.findUserMeasurements(username);

    let measurementsModels = [];
    if (!_.isNil(result)) {
      measurementsModels = result.map((measurement) => {
        return convertLokiMeasurementDataToBusinessModel(measurement);
      });
    }
    return measurementsModels;
  },

  insertUserMeasurement: function (username, measurementData) {
    let result = measurementDao.insertUserMeasurement(username, measurementData);

    let measurementModel;
    if (!_.isNil(result)) {
      measurementModel = convertLokiMeasurementDataToBusinessModel(result);
    }
    return measurementModel;
  },

  updateMeasurement: function (measurementId, measurementData) {
    let updatedMeasurement;

    let measurementBefore = measurementDao.findById(measurementId);
    if (!_.isNil(measurementBefore)) {
      measurementDao.updateMeasurement(measurementId, measurementData);
      let measurementAfter = measurementDao.findById(measurementId);
      if (!_.isNil(measurementAfter)) {
        updatedMeasurement = convertLokiMeasurementDataToBusinessModel(measurementAfter);
      }
    }
    return updatedMeasurement;
  },

  deleteMeasurementById: function (measurementId) {
    let deleted = false;

    let measurementBefore = measurementDao.findById(measurementId);
    if (!_.isNil(measurementBefore)) {
      measurementDao.deleteMeasurementById(measurementId);
      deleted = true;
    }
    return deleted;
  }

};
