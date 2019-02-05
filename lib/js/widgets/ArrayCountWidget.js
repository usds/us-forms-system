'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrayCountWidget = function (_React$Component) {
  _inherits(ArrayCountWidget, _React$Component);

  function ArrayCountWidget(props) {
    _classCallCheck(this, ArrayCountWidget);

    var _this = _possibleConstructorReturn(this, (ArrayCountWidget.__proto__ || Object.getPrototypeOf(ArrayCountWidget)).call(this, props));

    _this.getValue = function (count) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (count === 0) {
        return undefined;
      }

      var intCount = count + (_this.props.options.countOffset || 0);

      if (intCount < 0) {
        return undefined;
      }

      if (intCount < value.length) {
        return value.slice(0, intCount);
      }

      return Array(intCount - value.length).fill({}).concat(value);
    };

    _this.updateArrayLength = function (event) {
      _this.setState({ userCount: event.target.value });
    };

    _this.state = { userCount: props.value ? props.value.length - (_this.props.options.countOffset || 0) : undefined };
    return _this;
  }

  _createClass(ArrayCountWidget, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.userCount !== this.state.userCount) {
        var count = parseInt(this.state.userCount, 10);
        if (isNaN(count)) {
          count = 0;
        }

        // Too high of a count can crash the browser. We’ve been using
        // this for marriage counts and 29 is the record, so 29 seems like
        // a good upper limit. Filling out more than 29 pages is probably
        // not reasonable in a form anyway
        if (count > 29) {
          count = 29;
        }

        this.props.onChange(this.getValue(count, this.props.value));
      }
    }
    // We’re expanding or contracting the array based on the count
    // and returning undefined if the array should be empty

  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      if (props.formContext.reviewMode) {
        return _react2.default.createElement(
          'div',
          { className: 'review-row' },
          _react2.default.createElement(
            'dt',
            null,
            props.uiSchema['ui:title']
          ),
          _react2.default.createElement(
            'dd',
            null,
            this.state.userCount
          )
        );
      }

      return _react2.default.createElement('input', {
        autoComplete: props.options.autocomplete,
        type: 'number',
        step: '1',
        min: '1',
        id: props.id,
        name: props.id,
        disabled: props.disabled,
        className: (0, _classnames2.default)(props.options.widgetClassNames),
        value: typeof this.state.userCount === 'undefined' ? '' : this.state.userCount,
        onBlur: function onBlur() {
          return props.onBlur(props.id);
        },
        onChange: this.updateArrayLength });
    }
  }]);

  return ArrayCountWidget;
}(_react2.default.Component);

exports.default = ArrayCountWidget;


ArrayCountWidget.propTypes = {
  /**
   * ui:options from uiSchema
   */
  options: _propTypes2.default.shape({
    /*
    * input's autocomplete attribute value
    */
    autocomplete: _propTypes2.default.string
  })
};

ArrayCountWidget.defaultProps = {
  options: {}
};
//# sourceMappingURL=ArrayCountWidget.js.map