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

  it('should get Letters.$keys === [{id:0, key:"A"}, {id:1, key:"B"}, {id:2, key:"C"}]', () => {
    const json = JSON.stringify(app.enums.Letters.$keys);
    assert(json === '[{"id":0,"key":"A"},{"id":1,"key":"B"},{"id":2,"key":"C"}]');
  });
  it('should get Letters.B === 1', () => {
    assert(app.enums.Letters.B === 1);
  });
  it('should get Letters[2] === "C"', () => {
    assert(app.enums.Letters[2] === 'C');
  });

  it('should get Colors.GREEN === 4', () => {
    assert(app.enums.Colors.GREEN === 4);
  });
  it('should get Colors[5].name === "blue"', () => {
    assert(app.enums.Colors[5].name === 'blue');
  });

  it('should get Dir.Type.DIR === 0', () => {
    assert(app.enums.Dir.Type.DIR === 0);
  });

  it('should ignore _ignore', () => {
    assert(app.enums._ignore === undefined);
  });
});
