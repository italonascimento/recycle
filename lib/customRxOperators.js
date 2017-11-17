"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var reducer = exports.reducer = function reducer(reducerFn) {
  return function (stream) {
    return stream.map(function (event) {
      return { reducer: reducerFn, event: event };
    });
  };
};

exports.default = function (Rx) {
  if (!Rx.Observable.prototype.reducer) {
    Rx.Observable.prototype.reducer = function (reducerFn) {
      return reducer(reducerFn)(this);
    };
  }
};