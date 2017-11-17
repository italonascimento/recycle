'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function getNodeSelectors(nodeName, attrs) {
  var selectors = [];

  var tag = typeof nodeName === 'string' ? nodeName : undefined;
  var id = attrs ? attrs.id : undefined;
  var className = attrs ? attrs.className : undefined;
  var functionSelector = typeof nodeName === 'function' || (typeof nodeName === 'undefined' ? 'undefined' : _typeof(nodeName)) === 'object' ? nodeName : undefined;

  if (tag) {
    selectors.push({ selector: tag, selectorType: 'tag' });
  }

  if (functionSelector) {
    selectors.push({ selector: functionSelector, selectorType: 'tag' });
  }

  if (className) {
    var classes = className.split(' ').map(function (className) {
      return { selector: className, selectorType: 'class' };
    });
    selectors = selectors.concat(classes);
  }

  if (id) {
    selectors.push({ selector: id, selectorType: 'id' });
  }

  return selectors;
}

exports.default = getNodeSelectors;