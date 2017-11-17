'use strict';

var _shallowClone = require('./shallowClone');

var _shallowClone2 = _interopRequireDefault(_shallowClone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should create shallow clone', function () {
  var a = {
    firstLevel: 1
  };
  var b = {
    firstLevel: 2,
    second: a
  };
  var c = (0, _shallowClone2.default)(b);

  expect(c).not.toBe(b);
  expect(c.second).toBe(b.second);
}); /* global expect, it */