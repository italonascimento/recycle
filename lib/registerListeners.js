"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var registerListeners = function registerListeners(Rx) {
  return function (listeners, selectorType) {
    return function (selector) {
      return {
        addListener: function addListener(event) {
          var ref = listeners.filter(function (ref) {
            return ref.selector === selector;
          }).filter(function (ref) {
            return ref.selectorType === selectorType;
          }).filter(function (ref) {
            return ref.event === event;
          })[0];

          if (!ref) {
            ref = {
              selector: selector,
              selectorType: selectorType,
              event: event,
              stream: new Rx.Subject()
            };
            listeners.push(ref);
          }

          return ref.stream.switch();
        }
      };
    };
  };
};

exports.default = registerListeners;