'use strict';

let _ = require('lodash');

module.exports = {

  end: function (res, statusCode, object) {
    res.statusCode = statusCode;
    if (_.isNil(object)) {
      res.end();
    } else {
      res.end(JSON.stringify(object, null, 2));
    }
  }

};
