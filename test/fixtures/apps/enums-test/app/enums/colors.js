'use strict';

module.exports = app => app.Enum({
  RED: 1,
  GREEN: 4,
  BLUE: { id: 5, name: 'blue' },
});
