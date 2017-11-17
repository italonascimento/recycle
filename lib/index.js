'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.recycle = undefined;

var _customRxOperators = require('./customRxOperators');

Object.defineProperty(exports, 'reducer', {
  enumerable: true,
  get: function get() {
    return _customRxOperators.reducer;
  }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _Subject = require('rxjs/Subject');

var _BehaviorSubject = require('rxjs/BehaviorSubject');

var _Observable = require('rxjs/Observable');

require('rxjs/add/observable/merge');

require('rxjs/add/operator/map');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/do');

require('rxjs/add/operator/filter');

require('rxjs/add/operator/switch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rx = {
  Subject: _Subject.Subject,
  Observable: _Observable.Observable,
  BehaviorSubject: _BehaviorSubject.BehaviorSubject
};

var recycle = exports.recycle = (0, _component2.default)(_react2.default, Rx);
exports.default = recycle;