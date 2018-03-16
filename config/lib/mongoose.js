'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  chalk = require('chalk'),
  path = require('path'),
  mongoose = require('mongoose');
  // mongoose's promise library is deprecated, make use of the native promises instead
mongoose.Promise = Promise;
// Load the mongoose models
module.exports.loadModels = function () {
  // Globbing model files
  config.files.server.models.forEach(function (modelPath) {
    require(path.resolve(modelPath));
  });
};

// Initialize Mongoose
module.exports.connect = function (cb) {
  var _this = this;

  var db = mongoose.connect(config.db.uri, config.db.options, function (err) {
    console.log(chalk.white('mongoose.connect...'));

    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {
      console.error(chalk.white('mongoose.connect error was false...'));
      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.db.debug);

      // Call callback FN
      if (cb) {cb(db);}
    }
  });
};

module.exports.disconnect = function (cb) {
  mongoose.disconnect(function (err) {
    console.info(chalk.yellow('Disconnected from MongoDB.'));
    cb(err);
  });
};

module.exports.dropDatabase = function(cb) {
  console.error(chalk.white('Mongoose drop database...'));
  console.error(chalk.white('Connect cb MongoDB...'));
  mongoose.connect(config.db.uri, function() {
    console.error(chalk.white('Dropping db...'));
    mongoose.connection.db.dropDatabase();
    cb();
  });
}
