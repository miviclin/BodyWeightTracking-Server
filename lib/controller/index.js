'use strict';

module.exports = {
  authorizePOST: require('./authorize/post.js'),
  measurementsGET: require('./measurements/get.js'),
  measurementsPOST: require('./measurements/post.js'),
  measurementDELETE: require('./measurements/measurement/delete.js'),
  measurementPATCH: require('./measurements/measurement/patch.js')
};
