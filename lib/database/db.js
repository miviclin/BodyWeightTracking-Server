'use strict';

let loki = require('lokijs');

let db = new loki("database");

let users = db.addCollection("users");
let measurements = db.addCollection("measurements");

let miviclin = users.insert({
  username: "miviclin",
  password: "1234",
  avatarUrl: "https://pbs.twimg.com/profile_images/772148695584374784/_pqCvmqu_400x400.jpg"
});

measurements.insert({
  value: 72.2,
  unit: "kg",
  date: new Date("2017-06-01").toISOString(),
  username: "miviclin"
});

measurements.insert({
  value: 71.5,
  unit: "kg",
  date: new Date("2017-06-07").toISOString(),
  username: "miviclin"
});

measurements.insert({
  value: 70.8,
  unit: "kg",
  date: new Date("2017-06-14").toISOString(),
  username: "miviclin"
});

measurements.insert({
  value: 69.5,
  unit: "kg",
  date: new Date("2017-06-21").toISOString(),
  username: "miviclin"
});

measurements.insert({
  value: 69.0,
  unit: "kg",
  date: new Date("2017-07-10").toISOString(),
  username: "miviclin"
});

module.exports = {
  users: users,
  measurements: measurements
};
