'use strict';

let _ = require('lodash');

let db = require('../database/db.js');

module.exports = {

  findUserMeasurements: function (username) {
    return db.measurements.find({ username: username });;
  },

  findById: function (measurementId) {
    return db.measurements.findOne({ $loki: measurementId });
  },

  insertUserMeasurement: function (username, measurementData) {
    return db.measurements.insert({
      value: measurementData.value,
      unit: measurementData.unit,
      date: new Date(measurementData.date).toISOString(),
      username: username
    });
  },

  updateMeasurement: function (measurementId, measurementData) {
    db.measurements.findAndUpdate({ $loki: measurementId }, function (measurement) {
      if (!_.isNil(measurementData.value)) {
        measurement.value = measurementData.value;
      }
      if (!_.isNil(measurementData.unit)) {
        measurement.unit = measurementData.unit;
      }
      if (!_.isNil(measurementData.date)) {
        measurement.date = new Date(measurementData.date).toISOString();
      }
    });
  },

  deleteMeasurementById: function (measurementId) {
    db.measurements.findAndRemove({ $loki: measurementId });
  }

};
