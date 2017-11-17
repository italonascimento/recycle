"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function forceArray(arr) {
  if (!Array.isArray(arr)) return [arr];
  return arr;
}

exports.default = forceArray;