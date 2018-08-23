'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/enums.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/enums-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should get Letters.B === 1', () => {
    assert(app.enums.Letters.B === 1);
  });

  it('should get Colors.GREEN === 4', () => {
    assert(app.enums.Colors.GREEN === 4);
  });

  it('should get Dir.Type.DIR === 0', () => {
    assert(app.enums.Dir.Type.DIR === 0);
  });

  it('should ignore _ignore', () => {
    assert(app.enums._ignore === undefined);
  });
});
