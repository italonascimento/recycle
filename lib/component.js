'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _forceArray = require('./forceArray');

var _forceArray2 = _interopRequireDefault(_forceArray);

var _shallowClone = require('./shallowClone');

var _shallowClone2 = _interopRequireDefault(_shallowClone);

var _customRxOperators = require('./customRxOperators');

var _customRxOperators2 = _interopRequireDefault(_customRxOperators);

var _updateNodeStreams = require('./updateNodeStreams');

var _updateNodeStreams2 = _interopRequireDefault(_updateNodeStreams);

var _registerListeners = require('./registerListeners');

var _registerListeners2 = _interopRequireDefault(_registerListeners);

var _customCreateElement = require('./customCreateElement');

var _customCreateElement2 = _interopRequireDefault(_customCreateElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (React, Rx) {
  return function recycle(component) {
    var customCreateElement = (0, _customCreateElement2.default)(Rx);
    var registerListeners = (0, _registerListeners2.default)(Rx);
    var updateNodeStreams = (0, _updateNodeStreams2.default)(Rx);
    var originalCreateElement = React.createElement;
    (0, _customRxOperators2.default)(Rx);

    var RecycleComponent = function (_React$Component) {
      _inherits(RecycleComponent, _React$Component);

      function RecycleComponent() {
        _classCallCheck(this, RecycleComponent);

        return _possibleConstructorReturn(this, (RecycleComponent.__proto__ || Object.getPrototypeOf(RecycleComponent)).apply(this, arguments));
      }

      _createClass(RecycleComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          this.listeners = [];
          this.nodeStreams = [];

          this.sources = {
            select: registerListeners(this.listeners, 'tag'),
            selectClass: registerListeners(this.listeners, 'class'),
            selectId: registerListeners(this.listeners, 'id'),
            lifecycle: new Rx.Subject(),
            state: new Rx.Subject(),
            props: new Rx.Subject(),
            store: new Rx.Subject()
          };

          this.componentState = _extends({}, component.initialState);

          if (this.context && this.context.store) {
            // set global store reference
            this.context.store.subscribe(this.sources.store);

            // dispatch events to global reducer
            if (component.dispatch && this.context && this.context.reducer) {
              var _Rx$Observable;

              var events$ = (_Rx$Observable = Rx.Observable).merge.apply(_Rx$Observable, _toConsumableArray((0, _forceArray2.default)(component.dispatch(this.sources))));
              this.__eventsSubsription = events$.subscribe(function (a) {
                _this2.context.reducer.next(a);
              });
            }
          }

          // handling component state with update() stream
          this.setState(this.componentState);
          if (component.update) {
            var _Rx$Observable2;

            var state$ = (_Rx$Observable2 = Rx.Observable).merge.apply(_Rx$Observable2, _toConsumableArray((0, _forceArray2.default)(component.update(this.sources))));
            this.__stateSubsription = state$.subscribe(function (newVal) {
              if (_this2.__componentMounted) {
                _this2.componentState = (0, _shallowClone2.default)(newVal.reducer(_this2.componentState, newVal.event));
              } else {
                _this2.componentState = newVal.reducer(_this2.componentState, newVal.event);
              }
              _this2.setState(_this2.componentState);
            });
          }

          if (component.effects) {
            var _Rx$Observable3;

            var effects$ = (_Rx$Observable3 = Rx.Observable).merge.apply(_Rx$Observable3, _toConsumableArray((0, _forceArray2.default)(component.effects(this.sources))));
            this.__effectsSubsription = effects$.subscribe(function () {
              // intentionally empty
            });
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.__componentMounted = true;
          this.sources.lifecycle.next('componentDidMount');
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          updateNodeStreams(this.listeners, this.nodeStreams);
          this.sources.state.next(this.componentState);
          this.sources.props.next(this.props);
          this.sources.lifecycle.next('componentDidUpdate');
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.sources.lifecycle.next('componentWillUnmount');
          if (this.__stateSubsription) {
            this.__stateSubsription.unsubscribe();
          }
          if (this.__eventsSubsription) {
            this.__eventsSubsription.unsubscribe();
          }
          if (this.__effectsSubsription) {
            this.__effectsSubsription.unsubscribe();
          }
        }
      }, {
        key: 'render',
        value: function render() {
          this.nodeStreams = [];
          React.createElement = customCreateElement(this.listeners, this.nodeStreams, originalCreateElement);
          var view = component.view(this.props, this.componentState);
          React.createElement = originalCreateElement;

          updateNodeStreams(this.listeners, this.nodeStreams);
          this.sources.state.next(this.componentState);
          this.sources.props.next(this.props);

          return view;
        }
      }]);

      return RecycleComponent;
    }(React.Component);

    RecycleComponent.contextTypes = {
      store: _propTypes2.default.object,
      reducer: _propTypes2.default.object
    };
    RecycleComponent.propTypes = component.propTypes;
    RecycleComponent.displayName = component.displayName;

    return RecycleComponent;
  };
};