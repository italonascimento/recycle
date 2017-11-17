"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (Rx) {
  return function updateNodeStreams(listeners, nodeStreams) {
    listeners.forEach(function (regRef) {
      var streams = nodeStreams.filter(function (ref) {
        return ref.selector === regRef.selector;
      }).filter(function (ref) {
        return ref.selectorType === regRef.selectorType;
      }).filter(function (ref) {
        return ref.event === regRef.event;
      }).map(function (ref) {
        return ref.stream;
      });

      if (streams.length) {
        var _Rx$Observable;

        regRef.stream.next(streams.length === 1 ? streams[0] : (_Rx$Observable = Rx.Observable).merge.apply(_Rx$Observable, _toConsumableArray(streams)));
      }
    });
  };
};