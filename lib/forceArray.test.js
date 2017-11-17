'use strict';

var _forceArray = require('./forceArray');

var _forceArray2 = _interopRequireDefault(_forceArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should return an array', function () {
  expect((0, _forceArray2.default)(1)).toBeInstanceOf(Array);
}); /* global expect, it */


it('should return an array', function () {
  expect((0, _forceArray2.default)([1, 2, 3])).toBeInstanceOf(Array);
});