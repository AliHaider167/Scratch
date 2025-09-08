const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongo-connection");

mongoose
  .connect(`${config.get("MONGODB_URI")}/grand-project`)
  .then(function () {
    dbgr("Connected to MongoDB");
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
