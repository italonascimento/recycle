'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getNodeSelectors = require('./getNodeSelectors');

var _getNodeSelectors2 = _interopRequireDefault(_getNodeSelectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customCreateElement = function customCreateElement(Rx) {
  return function (listeners, nodeStreams, originalCreateElement) {
    return function () {
      var _arguments = arguments;

      var possibleSelectors = (0, _getNodeSelectors2.default)(arguments['0'], arguments['1']);

      possibleSelectors.forEach(function (_ref) {
        var selectorType = _ref.selectorType,
            selector = _ref.selector;

        listeners.filter(function (ref) {
          return ref.selector === selector;
        }).filter(function (ref) {
          return ref.selectorType === selectorType;
        }).forEach(function (registredRef) {
          var ref = {
            selector: selector,
            selectorType: selectorType,
            event: registredRef.event
          };
          if (!_arguments['1']) {
            _arguments['1'] = {};
          }
          if (typeof _arguments['1'][ref.event] === 'function') {
            ref.stream = new Rx.Subject();
            var customFunction = _arguments['1'][ref.event];
            _arguments['1'][ref.event] = function () {
              var event = customFunction.apply(this, arguments);
              ref.stream.next(event);
            };
          } else {
            ref.stream = new Rx.Subject();
            _arguments['1'][ref.event] = function () {
              var event = arguments['0'];
              ref.stream.next(event);
            };
          }
          nodeStreams.push(ref);
        });
      });

      return originalCreateElement.apply(this, arguments);
    };
  };
};

exports.default = customCreateElement;