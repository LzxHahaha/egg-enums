'use strict';

const path = require('path');
const Enum = require('./lib/enum');

module.exports = app => {
  app.Enum = Enum;

  const directory = path.join(app.config.baseDir, 'app/enums');
  app.loader.loadToApp(directory, 'enums', {
    inject: app,
    ignore: '_*',
    caseStyle: 'upper',
  });
};
